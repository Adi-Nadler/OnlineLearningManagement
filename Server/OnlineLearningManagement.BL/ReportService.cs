using OnlineLearningManagement.DAL.Interfaces;
using OnlineLearningManagement.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineLearningManagement.BL
{
	public class ReportService
	{
		private readonly CourseService _courseService;
		private readonly EnrolmentService _enrolmentService;

		public ReportService(CourseService courseService, EnrolmentService enrolmentService)
		{
			_courseService = courseService;
			_enrolmentService = enrolmentService;
		}

		public IEnumerable<EnrolmentReport> GetEnrolmentsPerCourse()
		{
			var courses = _courseService.GetAllCourses();
			var enrolments = _enrolmentService.GetAllEnrolments();

			var enrolmentsByCourse = enrolments
										.GroupBy(e => e.CourseId)
										.ToDictionary(g => g.Key, g => g.Count());

			return courses.Select(course => new EnrolmentReport
			{
				CourseId = course.Id,
				CourseName = course.Name,
				EnrolmentCount = enrolmentsByCourse.TryGetValue(course.Id, out var count) ? count : 0
			});
		}
	}

}
