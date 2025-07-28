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
}

@Component({
  selector: 'app-enrolment-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './enrolment-form.component.html',
  styleUrls: ['./enrolment-form.component.css']
})
export class EnrolmentFormComponent implements OnInit {
  @Input() enrolment: Enrolment | null = null;
  @Input() existingEnrolments: Enrolment[] = [];
  @Output() submit = new EventEmitter<Enrolment>();
  @Output() cancel = new EventEmitter<void>();

  formData: EnrolmentFormData = {
    studentId: '',
    courseId: ''
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
        courseId: this.enrolment.courseId
      };
    } else {
      this.formData = {
        studentId: '',
        courseId: ''
      };
    }
  }

  isDuplicateEnrolment(): boolean {
    if (!this.formData.studentId || !this.formData.courseId) {
      return false;
    }

    // Check if this combination already exists (excluding current enrolment if editing)
    return this.existingEnrolments.some(enrolment => {
      const isSameStudent = enrolment.studentId === this.formData.studentId;
      const isSameCourse = enrolment.courseId === this.formData.courseId;
      const isNotCurrentEnrolment = !this.enrolment || enrolment.enrolmentId !== this.enrolment.enrolmentId;
      
      return isSameStudent && isSameCourse && isNotCurrentEnrolment;
    });
  }

  getStudentName(studentId: string): string {
    const student = this.students.find(s => s.id === studentId);
    return student ? student.name : '';
  }

  getCourseName(courseId: string): string {
    const course = this.courses.find(c => c.id === courseId);
    return course ? course.name : '';
  }

  isFormValid(): boolean {
    return this.formData.studentId !== '' && 
           this.formData.courseId !== '' && 
           !this.isDuplicateEnrolment();
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
      enrolledAt: this.enrolment?.enrolledAt || '' // Keep existing date or let server set it
    };
    
    this.submit.emit(enrolmentData);
  }

  onCancel() {
    this.cancel.emit();
  }
}
