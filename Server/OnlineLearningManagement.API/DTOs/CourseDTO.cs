using OnlineLearningManagement.Model;

namespace OnlineLearningManagement.API.DTOs
{
	public class CourseDTO
	{
		public string Name { get; set; } = string.Empty;
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		public DayOfWeek DayOfWeek { get; set; }
		public int DurationInHours { get; set; }
		public decimal Price { get; set; }
		public bool IsActive { get; set; }


		// פונקציית מיפוי מ-DTO ל-Entity
		public Course ToEntity(Guid? id = null)
		{
			return new Course
			{
				Id = id ?? Guid.NewGuid(),
				Name = this.Name,
				StartDate = this.StartDate,
				EndDate = this.EndDate,
				DayOfWeek = this.DayOfWeek,
				DurationInHours = this.DurationInHours,
				Price = this.Price,
				IsActive = this.IsActive
			};
		}

		// פונקציית מיפוי מ-Entity ל-DTO
		public static CourseDTO FromEntity(Course course)
		{
			return new CourseDTO
			{
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

