using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineLearningManagement.Model
{
	public class Course : IEntity
	{
		public Guid Id { get; set; } = Guid.NewGuid();
		public required string Name { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		public System.DayOfWeek DayOfWeek { get; set; }
		public int DurationInHours { get; set; }
		public decimal Price { get; set; }
		public bool IsActive { get; set; }	

	}
}
