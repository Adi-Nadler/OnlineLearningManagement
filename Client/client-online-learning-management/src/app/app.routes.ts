import { Routes } from '@angular/router';
import { CoursesPageComponent } from './features/courses/pages/courses-page/courses-page.component';

export const routes: Routes = [
  { path: 'courses', component: CoursesPageComponent },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', redirectTo: '/courses' }
];
