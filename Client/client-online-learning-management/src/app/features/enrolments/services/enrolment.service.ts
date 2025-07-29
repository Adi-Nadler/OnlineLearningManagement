import { Injectable, signal, computed, effect } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Enrolment } from '../../../models/enrolment.model';
import { DataRefreshService } from '../../../core/services/data-refresh.service';
import { ToastService } from '../../../core/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class EnrolmentService {
  private baseUrl = 'https://localhost:7261/api/enrolments';
  
  // Signal to store the current list of enrolments
  private readonly _enrolments = signal<Enrolment[]>([]);
  readonly enrolments = computed(() => this._enrolments());
  
  private lastCourseRefreshCount = 0;
  private lastStudentRefreshCount = 0;
  
  constructor(
    private apiService: ApiService,
    private refreshService: DataRefreshService,
    private toastService: ToastService
  ) {
    this.loadEnrolments();
    this.setupRefreshListener();
  }
  
  private loadEnrolments(): void {
    this.apiService.get<Enrolment[]>(this.baseUrl).subscribe({
      next: (data) => this._enrolments.set(data),
      error: (err) => {
        console.error('Failed to load enrolments', err);
        this.toastService.error('Failed to load enrolments. Please try again.');
      }
    });
  }

  // Public method to reload enrolments from server
  reloadEnrolments(): void {
    this.loadEnrolments();
  }

  // Setup refresh listener for cross-feature communication
  private setupRefreshListener(): void {
    // Listen for course data changes that affect enrolments
    effect(() => {
      const currentCount = this.refreshService.courseDataChanged();
      if (currentCount > this.lastCourseRefreshCount) {
        this.lastCourseRefreshCount = currentCount;
        this.reloadEnrolments();
      }
    });

    // Listen for student data changes that affect enrolments
    effect(() => {
      const currentCount = this.refreshService.studentDataChanged();
      if (currentCount > this.lastStudentRefreshCount) {
        this.lastStudentRefreshCount = currentCount;
        this.reloadEnrolments();
      }
    });
  }
  
  getById(id: string): void {
    this.apiService.getById<Enrolment>(this.baseUrl, id).subscribe({
      next: (enrolment) => {
        this._enrolments.update(enrolments => [...enrolments.filter(e => e.enrolmentId !== id), enrolment]);
      },
      error: (err) => {
        console.error('Failed to get enrolment by id', err);
        this.toastService.error('Failed to load enrolment details.');
      }
    });
  }
  
  add(enrolment: Enrolment): void {
    this.apiService.post<Enrolment>(this.baseUrl, enrolment).subscribe({
      next: (newEnrolment) => {
        this._enrolments.update(enrolments => [...enrolments, newEnrolment]);
        const courseName = newEnrolment.course?.name || 'course';
        this.toastService.success(`Student successfully enrolled in ${courseName}!`);
      },
      error: (err) => {
        console.error('Failed to add enrolment', err);
        if (err.status === 409) {
          this.toastService.error('Student is already enrolled in this course.');
        } else {
          this.toastService.error('Failed to create enrolment. Please try again.');
        }
      }
    });
  }
  
  update(enrolment: Enrolment): void {
    this.apiService.put<Enrolment>(`${this.baseUrl}/${enrolment.enrolmentId}`, enrolment).subscribe({
      next: (updatedEnrolment) => {
        this._enrolments.update(enrolments => 
          enrolments.map(e => e.enrolmentId === enrolment.enrolmentId ? updatedEnrolment : e)
        );
        this.toastService.success('Enrolment updated successfully!');
      },
      error: (err) => {
        console.error('Failed to update enrolment', err);
        this.toastService.error('Failed to update enrolment. Please try again.');
      }
    });
  }
  
  delete(id: string): void {
    const enrolmentToDelete = this._enrolments().find(e => e.enrolmentId === id);
    const studentName = enrolmentToDelete?.student?.name || 'Student';
    const courseName = enrolmentToDelete?.course?.name || 'course';
    
    this.apiService.delete(`${this.baseUrl}/${id}`).subscribe({
      next: () => {
        this._enrolments.update(enrolments => 
          enrolments.filter(e => e.enrolmentId !== id)
        );
        this.toastService.success(`${studentName} successfully unenrolled from ${courseName}!`);
      },
      error: (err) => {
        console.error('Failed to delete enrolment', err);
        this.toastService.error('Failed to delete enrolment. Please try again.');
      }
    });
  }
}
