using Microsoft.AspNetCore.Mvc;
using OnlineLearningManagement.API.DTOs;
using OnlineLearningManagement.BL;

namespace OnlineLearningManagement.API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class StudentsController : ControllerBase
	{
		private readonly StudentService _studentService;

		public StudentsController(StudentService studentService)
		{
			_studentService = studentService;
		}

		// GET: api/students
		[HttpGet]
		public ActionResult<IEnumerable<StudentResponseDTO>> GetAll()
		{
			var students = _studentService.GetAllStudents()
				.Select(StudentResponseDTO.FromEntity);
			return Ok(students);
		}

		// GET: api/students/{id}
		[HttpGet("{id:guid}")]
		public ActionResult<StudentResponseDTO> GetById(Guid id)
		{
			var student = _studentService.GetStudentById(id);
			
			return Ok(StudentResponseDTO.FromEntity(student));
		}

		// POST: api/students
		[HttpPost]
		public ActionResult<StudentResponseDTO> Create([FromBody] StudentDTO student)
		{
			var addedStudent = _studentService.AddStudent(student.ToEntity());
			return CreatedAtAction(nameof(Create),
						new { id = addedStudent.Id },
						StudentResponseDTO.FromEntity(addedStudent));
		}

		// PUT: api/students/{id}
		[HttpPut("{id:guid}")]
		public ActionResult<StudentResponseDTO> Update(Guid id, [FromBody] StudentDTO updatedStudent)
		{
			var student = _studentService.UpdateStudent(id, updatedStudent.ToEntity());
			return Ok(StudentResponseDTO.FromEntity(student));
		}

		// DELETE: api/students/{id}
		[HttpDelete("{id:guid}")]
		public IActionResult Delete(Guid id)
		{
			_studentService.DeleteStudent(id);
			return NoContent();
		}
	}
}
