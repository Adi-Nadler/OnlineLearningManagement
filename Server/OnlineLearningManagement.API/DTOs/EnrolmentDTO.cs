using OnlineLearningManagement.Model;

namespace OnlineLearningManagement.API.DTOs
{
	public class EnrolmentDTO
	{
		public Guid StudentId { get; set; }
		public Guid CourseId { get; set; }

		public Enrolment ToEntity()
		{
			return new Enrolment
			{
				StudentId = this.StudentId,
				CourseId = this.CourseId
			};
		}
	}

}
