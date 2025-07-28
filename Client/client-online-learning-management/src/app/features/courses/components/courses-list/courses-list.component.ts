import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../../../models/course.model';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../../../shared/components/generic-table/generic-table.component';
import { TableColumn } from '../../../../shared/models/table-column.model';

@Component({
  selector: 'app-courses-list',
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  standalone: true
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Output() edit = new EventEmitter<Course>();
  @Output() delete = new EventEmitter<string>();

  columns: TableColumn[] = [
    { header: 'Name', key: 'name', type: 'text' },
    { header: 'Start Date', key: 'startDate', type: 'date' },
    { header: 'End Date', key: 'endDate', type: 'date' },
    { header: 'Day of Week', key: 'dayOfWeek', type: 'custom', customFormatter: (value: number) => this.getDayName(value) },
    { header: 'Duration (Hours)', key: 'durationInHours', type: 'text' },
    { header: 'Price', key: 'price', type: 'currency' },
    { header: 'Active', key: 'isActive', type: 'boolean' }
  ];

  getDayName(dayOfWeek: number): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayOfWeek] || 'Unknown';
  }

  onEdit(course: Course) {
    this.edit.emit(course);
  }

  onDelete(course: Course) {
    if (course.id) {
      this.delete.emit(course.id);
    }
  }
}
