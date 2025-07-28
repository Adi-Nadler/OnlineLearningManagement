import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataRefreshService {
  // Specific signal counters for different types of refresh events
  private readonly _courseDataChanged = signal(0);
  private readonly _studentDataChanged = signal(0);
  
  // Read-only signals that services can watch
  readonly courseDataChanged = this._courseDataChanged.asReadonly();
  readonly studentDataChanged = this._studentDataChanged.asReadonly();
  
  // Specific methods to trigger different types of refresh
  triggerCourseDataRefresh(): void {
    this._courseDataChanged.update(count => count + 1);
  }
  
  triggerStudentDataRefresh(): void {
    this._studentDataChanged.update(count => count + 1);
  }
}
