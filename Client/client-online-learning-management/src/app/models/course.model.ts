export interface Course {
  id?: string; // Guid as string, optional כי ב-POST אין Id
  name: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  dayOfWeek: number; // enum DayOfWeek, פה נשמור כמספר 0-6
  durationInHours: number;
  price: number;
  isActive: boolean;
}
