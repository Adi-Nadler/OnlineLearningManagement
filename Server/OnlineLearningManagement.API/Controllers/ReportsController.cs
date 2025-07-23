using Microsoft.AspNetCore.Mvc;
using OnlineLearningManagement.BL;
using OnlineLearningManagement.Model;
using System.Collections.Generic;

namespace OnlineLearningManagement.API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class ReportsController : ControllerBase
	{
		private readonly ReportService _reportService;

		public ReportsController(ReportService reportService)
		{
			_reportService = reportService;
		}

		// GET: api/reports/enrolments-per-course
		[HttpGet("enrolments-per-course")]
		public ActionResult<IEnumerable<EnrolmentReport>> GetEnrolmentsPerCourse()
		{
			var report = _reportService.GetEnrolmentsPerCourse();
			return Ok(report);
		}
	}
}
