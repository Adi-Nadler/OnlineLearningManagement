import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Course } from '../../../../models/course.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  @Input() course: Course | null = null;
  @Output() submit = new EventEmitter<Course>();
  @Output() cancel = new EventEmitter<void>();

  formData: Partial<Course> = {};


  ngOnInit() {
    if (this.course) {
      this.formData = { 
        ...this.course
      };
    } else {
      this.formData = { 
        name: '', 
        startDate: new Date(),
        endDate: new Date(), 
        dayOfWeek: 0, 
        durationInHours: 1, 
        price: 0, 
        isActive: true 
      };
    }
  }

  onSubmit(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.submit.emit({ ...this.course, ...this.formData } as Course);
  }

  onCancel() {
    this.cancel.emit();
  }

  getFormattedDate(date: Date | string| undefined): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

   get startDateString(): string {
    return this.formData.startDate ? this.getFormattedDate(this.formData.startDate) : '';
  }

  set startDateString(value: string) {
    this.formData.startDate = new Date(value);
  }

  get endDateString(): string {
    return this.formData.endDate ? this.getFormattedDate(this.formData.endDate) : '';
  }

  set endDateString(value: string) {
    this.formData.endDate = new Date(value);
  }

  get dayOfWeekString(): string {
    return this.formData.dayOfWeek?.toString() || '0';
  }

  set dayOfWeekString(value: string) {
    this.formData.dayOfWeek = parseInt(value, 10);
  }
}
