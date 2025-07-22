using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineLearningManagement.Model
{
	public class Enrolment : IEntity
	{
		public Guid Id { get; set; } = Guid.NewGuid();
		public Guid StudentId { get; set; }
		public Guid CourseId { get; set; }
		public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;
	}
}
