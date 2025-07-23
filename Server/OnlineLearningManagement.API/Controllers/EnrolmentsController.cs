using Microsoft.AspNetCore.Mvc;
using OnlineLearningManagement.API.DTOs;
using OnlineLearningManagement.BL;
using OnlineLearningManagement.Model;

namespace OnlineLearningManagement.API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class EnrolmentsController : ControllerBase
	{
		private readonly EnrolmentService _enrolmentService;

		public EnrolmentsController(EnrolmentService enrolmentService)
		{
			_enrolmentService = enrolmentService;
		}

		// GET: api/enrolments
		[HttpGet]
		public ActionResult<IEnumerable<EnrolmentResponseDTO>> GetAll()
		{
			var enrolments = _enrolmentService.GetAllEnrolmentWithDetails()
											  .Select(EnrolmentResponseDTO.FromEntity);
			return Ok(enrolments);
		}

		// GET: api/enrolments/{id}
		[HttpGet("{id:guid}")]
		public ActionResult<EnrolmentResponseDTO> GetById(Guid id)
		{
			var enrolment = _enrolmentService.GetEnrolmentById(id);
			return Ok(EnrolmentResponseDTO.FromEntity(enrolment));
		}

		// POST: api/enrolments
		[HttpPost]
		public ActionResult<EnrolmentResponseDTO> Create([FromBody] EnrolmentDTO enrolmentDto)
		{
			var created = _enrolmentService.AddEnrolment(enrolmentDto.ToEntity());
			return CreatedAtAction(nameof(Create),
				new { id = created.Enrolment.Id },
				EnrolmentResponseDTO.FromEntity(created));
		}

		// DELETE: api/enrolments/{id}
		[HttpDelete("{id:guid}")]
		public IActionResult Delete(Guid id)
		{
			_enrolmentService.DeleteEnrolment(id);
			return NoContent();
		}
	}
}
