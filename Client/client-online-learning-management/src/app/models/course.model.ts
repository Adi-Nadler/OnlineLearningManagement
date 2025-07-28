export interface Course {
  id?: string; // Guid as string
  name: string;
  startDate: Date; // C# DateTime
  endDate: Date; // C# DateTime
  dayOfWeek: number; // enum DayOfWeek
  durationInHours: number;
  price: number;
  isActive: boolean;
}
