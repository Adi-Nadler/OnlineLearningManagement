import { Injectable, signal } from '@angular/core';
import { Student } from '../../models/student.model';
import { ApiService } from './api.service';
import { computed } from '@angular/core';
import { DataRefreshService } from './data-refresh.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'https://localhost:7261/api/students';

  private readonly _students = signal<Student[]>([]);
  readonly students = computed(() => this._students());

  constructor(
    private api: ApiService,
    private refreshService: DataRefreshService
  ) {
    this.loadStudents();
  }

  private loadStudents(): void {
    this.api.get<Student[]>(this.baseUrl).subscribe({
      next: (data) => this._students.set(data),
      error: (err) => console.error('Failed to load students', err)
    });
  }

  getById(id: string): void {
    this.api.getById<Student>(this.baseUrl, id).subscribe({
      next: (student) => {
        this._students.update(students => [...students.filter(s => s.id !== id), student]);
      },
      error: (err) => console.error('Failed to get student by id', err)
    });
  }

  add(student: Student): void {
    this.api.post<Student>(this.baseUrl, student).subscribe({
      next: (newStudent) => this._students.update(students => [...students, newStudent]),
      error: (err) => console.error('Failed to add student', err)
    });
  }

  update(student: Student): void {
    this.api.put(`${this.baseUrl}/${student.id}`, student).subscribe({
      next: () => {
        this._students.update(students =>
          students.map(s => s.id === student.id ? student : s)
        );
      },
      error: (err) => console.error('Failed to update student', err)
    });
  }

  delete(id: string): void {
    this.api.delete(`${this.baseUrl}/${id}`).subscribe({
      next: () => {
        this._students.update(students => students.filter(s => s.id !== id));
        // Trigger specific student data refresh for other features
        this.refreshService.triggerStudentDataRefresh();
      },
      error: (err) => console.error('Failed to delete student', err)
    });
  }
}
