using OnlineLearningManagement.Model;

namespace OnlineLearningManagement.API.DTOs
{
	public class StudentResponseDTO : StudentDTO
	{
		public Guid Id { get; set; }

		public new static StudentResponseDTO FromEntity(Student student)
		{
			return new StudentResponseDTO
			{
				Id = student.Id,
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
