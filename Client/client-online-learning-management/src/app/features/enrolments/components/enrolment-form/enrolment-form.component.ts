import { Component, Input, Output, EventEmitter, OnInit, effect, signal } from '@angular/core';
import { Enrolment } from '../../../../models/enrolment.model';
import { Student } from '../../../../models/student.model';
import { Course } from '../../../../models/course.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../../../core/services/student.service';
import { CourseService } from '../../../courses/services/course.service';

interface EnrolmentFormData {
  studentId: string;
  courseId: string;
  enrolledAt: string;
}

@Component({
  selector: 'app-enrolment-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './enrolment-form.component.html',
  styleUrls: ['./enrolment-form.component.css']
})
export class EnrolmentFormComponent implements OnInit {
  @Input() enrolment: Enrolment | null = null;
  @Output() submit = new EventEmitter<Enrolment>();
  @Output() cancel = new EventEmitter<void>();

  formData: EnrolmentFormData = {
    studentId: '',
    courseId: '',
    enrolledAt: ''
  };

  students: Student[] = [];
  courses: Course[] = [];
  
  // Loading states as signals
  studentsLoading = signal(true);
  coursesLoading = signal(true);

  constructor(
    private studentService: StudentService,
    private courseService: CourseService
  ) {
    // Use effects to reactively update when data loads
    effect(() => {
      this.students = this.studentService.students();
      this.studentsLoading.set(this.students.length === 0);
    });

    effect(() => {
      this.courses = this.courseService.courses();
      this.coursesLoading.set(this.courses.length === 0);
    });
  }

  ngOnInit() {
    // Initialize form data
    if (this.enrolment) {
      this.formData = {
        studentId: this.enrolment.studentId,
        courseId: this.enrolment.courseId,
        enrolledAt: this.formatDateForInput(this.enrolment.enrolledAt)
      };
    } else {
      this.formData = {
        studentId: '',
        courseId: '',
        enrolledAt: this.formatDateForInput(new Date())
      };
    }
  }

  private formatDateForInput(date: Date | string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  onSubmit(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    const enrolmentData: Enrolment = {
      ...this.enrolment,
      studentId: this.formData.studentId,
      courseId: this.formData.courseId,
      enrolledAt: new Date(this.formData.enrolledAt).toISOString()
    };
    
    this.submit.emit(enrolmentData);
  }

  onCancel() {
    this.cancel.emit();
  }
}
