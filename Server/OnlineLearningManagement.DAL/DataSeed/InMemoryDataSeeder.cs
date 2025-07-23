using OnlineLearningManagement.DAL.Interfaces;
using OnlineLearningManagement.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineLearningManagement.DAL.DataSeed
{
	public static class InMemoryDataSeeder
	{
		public static void Seed(IRepository<Student> studentRepo, IRepository<Course> courseRepo, IRepository<Enrolment> enrolmentRepo)
		{
			// Add students
			var student1 = new Student { Name = "Alice", Email = "alice@example.com", DateOfBirth = new DateTime(2000, 1, 1), EnrollmentDate = DateTime.UtcNow };
			var student2 = new Student { Name = "Bob", Email = "bob@example.com", DateOfBirth = new DateTime(1999, 5, 15), EnrollmentDate = DateTime.UtcNow.AddDays(-10) };
			var student3 = new Student { Name = "Charlie", Email = "charlie@example.com", DateOfBirth = new DateTime(2001, 3, 20), EnrollmentDate = DateTime.UtcNow.AddDays(-20) };
			studentRepo.Add(student1);
			studentRepo.Add(student2);
			studentRepo.Add(student3);

			// Add courses
			var course1 = new Course
			{
				Name = "Introduction to Programming",
				StartDate = DateTime.UtcNow,
				EndDate = DateTime.UtcNow.AddMonths(1),
				DayOfWeek = DayOfWeek.Monday,
				DurationInHours = 40,
				Price = 100,
				IsActive = true
			};
			var course2 = new Course
			{
				Name = "Business Communication",
				StartDate = DateTime.UtcNow.AddDays(7),
				EndDate = DateTime.UtcNow.AddMonths(2),
				DayOfWeek = DayOfWeek.Wednesday,
				DurationInHours = 60,
				Price = 150,
				IsActive = true
			};
			var course3 = new Course
			{
				Name = "Financial Accounting",
				StartDate = DateTime.UtcNow.AddDays(14),
				EndDate = DateTime.UtcNow.AddMonths(1).AddDays(14),
				DayOfWeek = DayOfWeek.Friday,
				DurationInHours = 30,
				Price = 80,
				IsActive = false
			};
			courseRepo.Add(course1);
			courseRepo.Add(course2);
			courseRepo.Add(course3);

			// Add enrolments
			var enrolment1 = new Enrolment { StudentId = student1.Id, CourseId = course1.Id, EnrolledAt = DateTime.UtcNow };
			var enrolment2 = new Enrolment { StudentId = student2.Id, CourseId = course1.Id, EnrolledAt = DateTime.UtcNow.AddDays(-1) };
			var enrolment3 = new Enrolment { StudentId = student2.Id, CourseId = course2.Id, EnrolledAt = DateTime.UtcNow.AddDays(-2) };
			var enrolment4 = new Enrolment { StudentId = student3.Id, CourseId = course3.Id, EnrolledAt = DateTime.UtcNow.AddDays(-3) };
			var enrolment5 = new Enrolment { StudentId = student1.Id, CourseId = course2.Id, EnrolledAt = DateTime.UtcNow.AddDays(-4) };
			enrolmentRepo.Add(enrolment1);
			enrolmentRepo.Add(enrolment2);
			enrolmentRepo.Add(enrolment3);
			enrolmentRepo.Add(enrolment4);
			enrolmentRepo.Add(enrolment5);
		}
	}
}
