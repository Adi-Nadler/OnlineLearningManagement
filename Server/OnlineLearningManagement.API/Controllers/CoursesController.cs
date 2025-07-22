using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineLearningManagement.API.DTOs;
using OnlineLearningManagement.BL;
using OnlineLearningManagement.Model;

namespace OnlineLearningManagement.API.Controllers
{
	[ApiController]	
	[Route("api/[controller]")]
	public class CoursesController : ControllerBase
	{
		private readonly CourseService _courseService;

		public CoursesController(CourseService courseService)
		{
			_courseService = courseService;
		}

		// GET: api/courses
		[HttpGet]
		public ActionResult<IEnumerable<CourseResponseDTO>> GetAll()
		{
			var courses = _courseService.GetAllCourses()
										.Select(CourseResponseDTO.FromEntity);
			return Ok(courses);
		}

		// GET: api/courses/{id}
		[HttpGet("{id:guid}")]
		public ActionResult<CourseResponseDTO> GetById(Guid id)
		{
			var course = _courseService.GetCourseById(id);

			return Ok(CourseResponseDTO.FromEntity(course));
		}

		// POST: api/courses
		[HttpPost]
		public ActionResult<CourseResponseDTO> Create([FromBody] CourseDTO course)
		{
			var addedCourse = _courseService.AddCourse(course.ToEntity());
			return CreatedAtAction(nameof(Create),
				new { id = addedCourse.Id },
				CourseResponseDTO.FromEntity(addedCourse));
		}

		// PUT: api/courses/{id}
		[HttpPut("{id:guid}")]
		public ActionResult<CourseResponseDTO> Update(Guid id, [FromBody] CourseDTO updatedCourse)
		{
			var course = _courseService.UpdateCourse(id, updatedCourse.ToEntity());
			return Ok(CourseResponseDTO.FromEntity(course));
		}

		// DELETE: api/courses/{id}
		[HttpDelete("{id:guid}")]
		public IActionResult Delete(Guid id)
		{
			_courseService.DeleteCourse(id); 
			return NoContent();
		}
	}
}
