import { Routes } from '@angular/router';
import { CoursesPageComponent } from './features/courses/pages/courses-page/courses-page.component';
import { EnrolmentsPageComponent } from './features/enrolments/pages/enrolments-page/enrolments-page.component';
import { ReportsPageComponent } from './features/reports/pages/reports-page/reports-page.component';

export const routes: Routes = [
  { path: 'courses', component: CoursesPageComponent },
  { path: 'enrolments', component: EnrolmentsPageComponent },
  { path: 'reports', component: ReportsPageComponent },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', redirectTo: '/courses' }
];
