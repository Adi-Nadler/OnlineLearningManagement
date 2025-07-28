import { Component, Input } from '@angular/core';
import { EnrolmentReport } from '../../../../models/enrolment-report.model';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../../../shared/components/generic-table/generic-table.component';
import { TableColumn } from '../../../../shared/models/table-column.model';

@Component({
  selector: 'app-reports-list',
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css'],
  standalone: true
})
export class ReportsListComponent {
  @Input() reports: EnrolmentReport[] = [];

  columns: TableColumn[] = [
    { header: 'Course Name', key: 'courseName', type: 'text' },
    { header: 'Total Students', key: 'enrolmentCount', type: 'number' }
  ];
}
