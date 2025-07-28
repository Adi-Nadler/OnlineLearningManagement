import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnrolmentReport } from '../../../models/enrolment-report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'https://localhost:7261/api/reports';

  constructor(private http: HttpClient) {}

  getEnrolmentsPerCourse(): Observable<EnrolmentReport[]> {
    return this.http.get<EnrolmentReport[]>(`${this.apiUrl}/enrolments-per-course`);
  }
}
