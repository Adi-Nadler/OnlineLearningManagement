import { Injectable, signal } from '@angular/core';
import { Course } from '../../../models/course.model';
import { ApiService } from '../../../core/services/api.service';
import { computed, effect } from '@angular/core';
import { DataRefreshService } from '../../../core/services/data-refresh.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'https://localhost:7261/api/courses';

  // Signal to store the current list of courses
  private readonly _courses = signal<Course[]>([]);
  readonly courses = computed(() => this._courses());

  constructor(
    private api: ApiService,
    private refreshService: DataRefreshService
  ) {
    this.loadCourses();
  }

  private loadCourses(): void {
    this.api.get<Course[]>(this.baseUrl).subscribe({
      next: (data) => this._courses.set(data),
      error: (err) => console.error('Failed to load courses', err)
    });
  }

  getById(id: string): void {
    this.api.getById<Course>(this.baseUrl, id).subscribe({
      next: (course) => {
        this._courses.update(courses => [...courses.filter(c => c.id !== id), course]);
      },
      error: (err) => console.error('Failed to get course by id', err)
    });
  }

  add(course: Course): void {
    this.api.post<Course>(this.baseUrl, course).subscribe({
      next: (newCourse) => this._courses.update(courses => [...courses, newCourse]),
      error: (err) => console.error('Failed to add course', err)
    });
  }

  update(course: Course): void {
    this.api.put(`${this.baseUrl}/${course.id}`, course).subscribe({
      next: () => {
        this._courses.update(courses =>
          courses.map(c => c.id === course.id ? course : c)
        );
      },
      error: (err) => console.error('Failed to update course', err)
    });
  }

  delete(id: string): void {
    this.api.delete(`${this.baseUrl}/${id}`).subscribe({
      next: () => {
        this._courses.update(courses => courses.filter(c => c.id !== id));
        // Trigger specific course data refresh for other features
        this.refreshService.triggerCourseDataRefresh();
      },
      error: (err) => console.error('Failed to delete course', err)
    });
  }
}
