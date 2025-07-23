using OnlineLearningManagement.Model;

namespace OnlineLearningManagement.API.DTOs
{
	public class StudentDTO
	{
		public string Name { get; set; } = string.Empty;
		public string Email { get; set; } = string.Empty;
		public DateTime DateOfBirth { get; set; }
		public string? PhoneNumber { get; set; }
		public DateTime EnrollmentDate { get; set; }
		public bool IsActive { get; set; } = true;

		public Student ToEntity()
		{
			return new Student
			{
				Name = this.Name,
				Email = this.Email,
				DateOfBirth = this.DateOfBirth,
				PhoneNumber = this.PhoneNumber,
				EnrollmentDate = this.EnrollmentDate,
				IsActive = this.IsActive
			};
		}

		public static StudentDTO FromEntity(Student student)
		{
			return new StudentDTO
			{
				Name = student.Name,
				Email = student.Email,
				DateOfBirth = student.DateOfBirth,
				PhoneNumber = student.PhoneNumber,
				EnrollmentDate = student.EnrollmentDate,
				IsActive = student.IsActive
			};
		}
	}
}

