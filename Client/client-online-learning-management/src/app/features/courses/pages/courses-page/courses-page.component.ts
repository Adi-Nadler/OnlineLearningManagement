import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { Course } from '../../../../models/course.model';
import { Signal } from '@angular/core';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { CourseFormComponent } from '../../components/course-form/course-form.component';

@Component({
  selector: 'app-courses-page',
  imports: [CommonModule, CoursesListComponent, CourseFormComponent],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesPageComponent {
  courses: Signal<Course[]>;
  selectedCourse: Course | null = null;
  showForm = false;
  private isSubmitting = false;

  constructor(private courseService: CourseService) {
    this.courses = this.courseService.courses;
  }

  onAddCourse() {
    this.selectedCourse = null;
    this.showForm = true;
  }

  onEditCourse(course: Course) {
    this.selectedCourse = course;
    this.showForm = true;
  }

  onDeleteCourse(id: string) {
    this.courseService.delete(id);
  }

  onFormSubmit(course: Course) {
    if (this.isSubmitting) {
      return; // Prevent double execution
    }
    
    this.isSubmitting = true;
    
    try {
      if (course.id) {
        this.courseService.update(course);
      } else {
        this.courseService.add(course);
      }
      
      this.showForm = false;
      this.selectedCourse = null;
    } finally {
      // Reset immediately after the operation
      this.isSubmitting = false;
    }
  }

  onFormCancel() {
    this.showForm = false;
  }
}
