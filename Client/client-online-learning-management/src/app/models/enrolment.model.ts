import { Course } from "./course.model";
import { Student } from "./student.model";

export interface Enrolment {
  enrolmentId?: string; // Guid
  enrolledAt: string; // ISO string
  studentId: string; // Guid
  courseId: string; // Guid
  student?: Student; 
  course?: Course; 
}
