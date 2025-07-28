using OnlineLearningManagement.Model;

namespace OnlineLearningManagement.API.DTOs
{
	public class EnrolmentResponseDTO: EnrolmentDTO
	{
		public Guid EnrolmentId { get; set; }
		public StudentResponseDTO Student { get; set; } = null!;
		public CourseResponseDTO Course { get; set; } = null!;
		public DateTime EnrolledAt { get; private set; }

		public static EnrolmentResponseDTO FromEntity(EnrolmentWithDetails entity)
		{
			return new EnrolmentResponseDTO
			{
				EnrolmentId = entity.Enrolment.Id,
				StudentId = entity.Enrolment.StudentId,
				CourseId = entity.Enrolment.CourseId,
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
