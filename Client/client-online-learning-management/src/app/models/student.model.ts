export interface Student {
  id?: string; // Guid
  name: string;
  email: string;
  dateOfBirth: string; // ISO string
  phoneNumber?: string | null;
  enrollmentDate: string; // ISO string
  isActive: boolean;
}
