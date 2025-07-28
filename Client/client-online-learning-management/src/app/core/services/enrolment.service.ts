import { Injectable, signal } from '@angular/core';
import { Enrolment } from '../../models/enrolment.model';
import { ApiService } from './api.service';
import { computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnrolmentService {
  private baseUrl = 'https://localhost:7184/api/enrolments';

  private readonly _enrolments = signal<Enrolment[]>([]);
  readonly enrolments = computed(() => this._enrolments());

  constructor(private api: ApiService) {
    this.loadEnrolments();
  }

  private loadEnrolments(): void {
    this.api.get<Enrolment[]>(this.baseUrl).subscribe({
      next: (data) => this._enrolments.set(data),
      error: (err) => console.error('Failed to load enrolments', err)
    });
  }

  getById(id: string): void {
    this.api.getById<Enrolment>(this.baseUrl, id).subscribe({
      next: (enrolment) => {
        this._enrolments.update(enrolments => [...enrolments.filter(e => e.enrolmentId !== id), enrolment]);
      },
      error: (err) => console.error('Failed to get enrolment by id', err)
    });
  }

  add(enrolment: Enrolment): void {
    this.api.post<Enrolment>(this.baseUrl, enrolment).subscribe({
      next: (newEnrolment) => this._enrolments.update(enrolments => [...enrolments, newEnrolment]),
      error: (err) => console.error('Failed to add enrolment', err)
    });
  }

  delete(id: string): void {
    this.api.delete(`${this.baseUrl}/${id}`).subscribe({
      next: () => {
        this._enrolments.update(enrolments => enrolments.filter(e => e.enrolmentId !== id));
      },
      error: (err) => console.error('Failed to delete enrolment', err)
    });
  }
}
