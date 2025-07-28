import { Routes } from '@angular/router';
import { CoursesPageComponent } from './features/courses/pages/courses-page/courses-page.component';
import { EnrolmentsPageComponent } from './features/enrolments/pages/enrolments-page/enrolments-page.component';

export const routes: Routes = [
  { path: 'courses', component: CoursesPageComponent },
  { path: 'enrolments', component: EnrolmentsPageComponent },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', redirectTo: '/courses' }
];
