using System;
using OnlineLearningManagement.DAL.Interfaces;
using OnlineLearningManagement.Model;

namespace OnlineLearningManagement.BL
{
	public class EnrolmentService
	{
		private readonly IRepository<Enrolment> _enrolmentRepository;
		private readonly IRepository<Student> _studentRepository;
		private readonly IRepository<Course> _courseRepository;

		public EnrolmentService(IRepository<Enrolment> enrolmentRepository, IRepository<Student> studentRepository, IRepository<Course> courseRepository)
		{
			_enrolmentRepository = enrolmentRepository;
			_studentRepository = studentRepository;
			_courseRepository = courseRepository;
		}

		public IEnumerable<Enrolment> GetAllEnrolments()
		{
			return _enrolmentRepository.GetAll();
		}

		public IEnumerable<EnrolmentWithDetails> GetAllEnrolmentWithDetails()
		{
			var enrolments = GetAllEnrolments();
			foreach (var enrolment in enrolments)
			{
				yield return GetEnrolmentWithDetails(enrolment);
			}
		}

		public EnrolmentWithDetails GetEnrolmentById(Guid id)
		{
			var enrolment = _enrolmentRepository.GetById(id);
			if (enrolment == null)
				throw new KeyNotFoundException($"Enrolment with Id {id} not found.");

			return GetEnrolmentWithDetails(enrolment);
		}

		public EnrolmentWithDetails AddEnrolment(Enrolment enrolment)
		{
			if (enrolment == null)
				throw new ArgumentNullException(nameof(enrolment));
			if (enrolment.StudentId == Guid.Empty)
				throw new ArgumentException("StudentId is required.");
			if (enrolment.CourseId == Guid.Empty)
				throw new ArgumentException("CourseId is required.");
			
			var student = _studentRepository.GetById(enrolment.StudentId);
			if (student == null)
				throw new InvalidOperationException("Student not found.");

			var course = _courseRepository.GetById(enrolment.CourseId);
			if (course == null)
				throw new InvalidOperationException("Course not found.");

			if (enrolment.Id == Guid.Empty)
				enrolment.Id = Guid.NewGuid();
			if (enrolment.EnrolledAt == default)
				enrolment.EnrolledAt = DateTime.UtcNow;

			_enrolmentRepository.Add(enrolment);

			return new EnrolmentWithDetails
			{
				Enrolment = enrolment,
				Student = student,
				Course = course
			};
		}

		public void DeleteEnrolment(Guid id)
		{
			var existing = _enrolmentRepository.GetById(id);
			if (existing == null)
				throw new KeyNotFoundException("Enrolment not found");

			_enrolmentRepository.Delete(id);
		}

		private EnrolmentWithDetails GetEnrolmentWithDetails(Enrolment enrolment)
		{
			if (enrolment == null)
				throw new ArgumentNullException(nameof(enrolment));

			var student = _studentRepository.GetById(enrolment.StudentId);
			if (student == null)
				throw new KeyNotFoundException($"Student with Id {enrolment.StudentId} not found.");

			var course = _courseRepository.GetById(enrolment.CourseId);
			if (course == null)
				throw new KeyNotFoundException($"Course with Id {enrolment.CourseId} not found.");

			return new EnrolmentWithDetails
			{
				Enrolment = enrolment,
				Student = student,
				Course = course
			};
		}

	}
}
