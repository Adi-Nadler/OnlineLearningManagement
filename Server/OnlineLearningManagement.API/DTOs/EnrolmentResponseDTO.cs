using OnlineLearningManagement.Model;

namespace OnlineLearningManagement.API.DTOs
{
	public class EnrolmentResponseDTO
	{
		public Guid EnrolmentId { get; set; }
		public DateTime EnrolledAt { get; set; }
		public StudentDTO Student { get; set; } = null!;
		public CourseDTO Course { get; set; } = null!;

		public static EnrolmentResponseDTO FromEntity(EnrolmentWithDetails entity)
		{
			return new EnrolmentResponseDTO
			{
				EnrolmentId = entity.Enrolment.Id,
				EnrolledAt = entity.Enrolment.EnrolledAt,
				Student = new StudentResponseDTO
				{
					Id = entity.Student.Id,
					Name = entity.Student.Name,
					Email = entity.Student.Email
				},
				Course = new CourseResponseDTO
				{
					Id = entity.Course.Id,
					Name = entity.Course.Name
				}
			};
		}

	}
}
