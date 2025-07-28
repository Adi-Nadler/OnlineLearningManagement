using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace OnlineLearningManagement.Model
{
	public class Course : IEntity
	{
		public Guid Id { get; set; } = Guid.NewGuid();
		
		[Required]
		[StringLength(100, MinimumLength = 1)]
		public required string Name { get; set; }
		
		[Required]
		public DateTime StartDate { get; set; }
		
		[Required]
		public DateTime EndDate { get; set; }
		
		[Range(0, 6)]
		public System.DayOfWeek DayOfWeek { get; set; }
		
		[Range(1, int.MaxValue)]
		public int DurationInHours { get; set; }
		
		[Range(0, double.MaxValue)]
		public decimal Price { get; set; }
		
		public bool IsActive { get; set; }	
	}
}
