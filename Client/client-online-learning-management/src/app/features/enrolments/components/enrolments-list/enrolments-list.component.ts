import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Enrolment } from '../../../../models/enrolment.model';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../../../shared/components/generic-table/generic-table.component';
import { TableColumn } from '../../../../shared/models/table-column.model';

@Component({
  selector: 'app-enrolments-list',
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './enrolments-list.component.html',
  styleUrls: ['./enrolments-list.component.css'],
  standalone: true
})
export class EnrolmentsListComponent {
  @Input() enrolments: Enrolment[] = [];
  @Output() delete = new EventEmitter<string>();

  columns: TableColumn[] = [
    { header: 'Student', key: 'student.name', type: 'text' },
    { header: 'Course', key: 'course.name', type: 'text' },
    { header: 'Enrolled At', key: 'enrolledAt', type: 'date' }
  ];

  onEdit(enrolment: Enrolment) {
    // Edit functionality disabled for enrolments
  }

  onDelete(enrolment: Enrolment) {
    if (enrolment.enrolmentId) {
      this.delete.emit(enrolment.enrolmentId);
    }
  }
}
