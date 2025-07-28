import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsListComponent } from '../../components/reports-list/reports-list.component';
import { ReportService } from '../../services/report.service';
import { EnrolmentReport } from '../../../../models/enrolment-report.model';

@Component({
  selector: 'app-reports-page',
  imports: [CommonModule, ReportsListComponent],
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.css'],
  standalone: true
})
export class ReportsPageComponent implements OnInit {
  reports = signal<EnrolmentReport[]>([]);
  loading = signal<boolean>(false);

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.loading.set(true);
    this.reportService.getEnrolmentsPerCourse().subscribe({
      next: (reports) => {
        this.reports.set(reports);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading reports:', error);
        this.loading.set(false);
      }
    });
  }

  onRefresh() {
    this.loadReports();
  }
}
