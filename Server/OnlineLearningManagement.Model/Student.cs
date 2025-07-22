using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineLearningManagement.Model
{
	public class Student: IEntity
	{
		public Guid Id { get; set; } = Guid.NewGuid();
		public required string Name { get; set; }
		public required string Email { get; set; }
		public DateTime DateOfBirth { get; set; }
		public string? PhoneNumber { get; set; }
		public DateTime EnrollmentDate { get; set; }
		public bool IsActive { get; set; } = true;
	}
}
