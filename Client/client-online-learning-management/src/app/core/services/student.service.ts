import { Injectable, signal } from '@angular/core';
import { Student } from '../../models/student.model';
import { ApiService } from './api.service';
import { computed } from '@angular/core';
import { DataRefreshService } from './data-refresh.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'https://localhost:7261/api/students';

  private readonly _students = signal<Student[]>([]);
  readonly students = computed(() => this._students());

  constructor(
    private api: ApiService,
    private refreshService: DataRefreshService,
    private toastService: ToastService
  ) {
    this.loadStudents();
  }

  private loadStudents(): void {
    this.api.get<Student[]>(this.baseUrl).subscribe({
      next: (data) => this._students.set(data),
      error: (err) => {
        console.error('Failed to load students', err);
        this.toastService.error('Failed to load students. Please try again.');
      }
    });
  }

  getById(id: string): void {
    this.api.getById<Student>(this.baseUrl, id).subscribe({
      next: (student) => {
        this._students.update(students => [...students.filter(s => s.id !== id), student]);
      },
      error: (err) => {
        console.error('Failed to get student by id', err);
        this.toastService.error('Failed to load student details.');
      }
    });
  }

  add(student: Student): void {
    this.api.post<Student>(this.baseUrl, student).subscribe({
      next: (newStudent) => {
        this._students.update(students => [...students, newStudent]);
        this.toastService.success(`Student "${newStudent.name}" created successfully!`);
      },
      error: (err) => {
        console.error('Failed to add student', err);
        this.toastService.error('Failed to create student. Please try again.');
      }
    });
  }

  update(student: Student): void {
    this.api.put(`${this.baseUrl}/${student.id}`, student).subscribe({
      next: () => {
        this._students.update(students =>
          students.map(s => s.id === student.id ? student : s)
        );
        this.toastService.success(`Student "${student.name}" updated successfully!`);
      },
      error: (err) => {
        console.error('Failed to update student', err);
        this.toastService.error('Failed to update student. Please try again.');
      }
    });
  }

  delete(id: string): void {
    const studentToDelete = this._students().find(s => s.id === id);
    const studentName = studentToDelete?.name || 'Student';
    
    this.api.delete(`${this.baseUrl}/${id}`).subscribe({
      next: () => {
        this._students.update(students => students.filter(s => s.id !== id));
        // Trigger specific student data refresh for other features
        this.refreshService.triggerStudentDataRefresh();
        this.toastService.success(`${studentName} deleted successfully!`);
      },
      error: (err) => {
        console.error('Failed to delete student', err);
        this.toastService.error('Failed to delete student. Please try again.');
      }
    });
  }
}
