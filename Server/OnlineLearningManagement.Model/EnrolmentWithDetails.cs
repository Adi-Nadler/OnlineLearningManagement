using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineLearningManagement.Model
{
	public class EnrolmentWithDetails
	{
		public Enrolment Enrolment { get; set; }
		public Student Student { get; set; }
		public Course Course { get; set; }
	}

}
