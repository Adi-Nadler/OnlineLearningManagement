using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineLearningManagement.Model
{
	public class EnrolmentReport
	{
		public Guid CourseId { get; set; }
		public string CourseName { get; set; } = string.Empty;
		public int EnrolmentCount { get; set; }
	}
}

