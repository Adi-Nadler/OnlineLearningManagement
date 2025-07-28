import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { CoursesPageComponent } from './features/courses/pages/courses-page/courses-page.component';
import { CoursesListComponent } from './features/courses/components/courses-list/courses-list.component';
import { CourseFormComponent } from './features/courses/components/course-form/course-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CoursesPageComponent,
    CoursesListComponent,
    CourseFormComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
