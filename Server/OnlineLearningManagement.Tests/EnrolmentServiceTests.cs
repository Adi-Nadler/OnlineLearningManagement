using System;
using OnlineLearningManagement.BL;
using OnlineLearningManagement.DAL.Repositories;
using OnlineLearningManagement.Model;
using Xunit;

namespace OnlineLearningManagement.Tests
{
	public class EnrolmentServiceTests
	{
		[Fact]
		public void AddEnrolment_ValidData_ReturnsEnrolmentWithDetails()
		{
			// Arrange
			var studentRepo = new InMemoryDictionaryRepository<Student>();
			var courseRepo = new InMemoryDictionaryRepository<Course>();
			var enrolmentRepo = new InMemoryDictionaryRepository<Enrolment>();

			var student = new Student { Name = "Test Student", Email = "test@student.com", DateOfBirth = new DateTime(2000, 1, 1), EnrollmentDate = DateTime.UtcNow };
			var course = new Course { Name = "Test Course", StartDate = DateTime.UtcNow, EndDate = DateTime.UtcNow.AddMonths(1), DayOfWeek = DayOfWeek.Monday, DurationInHours = 10, Price = 50, IsActive = true };
			studentRepo.Add(student);
			courseRepo.Add(course);

			var service = new EnrolmentService(enrolmentRepo, studentRepo, courseRepo);

			var enrolment = new Enrolment { StudentId = student.Id, CourseId = course.Id };

			// Act
			var result = service.AddEnrolment(enrolment);

			// Assert
			Assert.NotNull(result);
			Assert.Equal(student.Id, result.Enrolment.StudentId);
			Assert.Equal(course.Id, result.Enrolment.CourseId);
			Assert.Equal(student.Name, result.Student.Name);
			Assert.Equal(course.Name, result.Course.Name);
		}
	}
}