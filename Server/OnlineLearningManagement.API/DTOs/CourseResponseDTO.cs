using OnlineLearningManagement.Model;

namespace OnlineLearningManagement.API.DTOs
{
	public class CourseResponseDTO : CourseDTO
	{
		public Guid Id { get; set; }

		public static CourseResponseDTO FromEntity(Course course)
		{
			return new CourseResponseDTO
			{
				Id = course.Id,
				Name = course.Name,
				StartDate = course.StartDate,
				EndDate = course.EndDate,
				DayOfWeek = course.DayOfWeek,
				DurationInHours = course.DurationInHours,
				Price = course.Price,
				IsActive = course.IsActive
			};
		}
	}
}
