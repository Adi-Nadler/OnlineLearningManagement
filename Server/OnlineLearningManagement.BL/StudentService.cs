using System;
using OnlineLearningManagement.DAL.Interfaces;
using OnlineLearningManagement.Model;

namespace OnlineLearningManagement.BL
{
	public class StudentService
	{
		private readonly IRepository<Student> _studentRepository;

		public StudentService(IRepository<Student> studentRepository)
		{
			_studentRepository = studentRepository;
		}

		public IEnumerable<Student> GetAllStudents()
		{
			return _studentRepository.GetAll();
		}

		public Student GetStudentById(Guid id)
		{
			var student = _studentRepository.GetById(id);
			if (student == null)
				throw new KeyNotFoundException("Student not found");

			return student;
		}

		public Student AddStudent(Student student)
		{
			if (student == null)
				throw new ArgumentNullException(nameof(student));
			if (string.IsNullOrWhiteSpace(student.Name))
				throw new ArgumentException("Student name cannot be empty.");
			if (string.IsNullOrWhiteSpace(student.Email))
				throw new ArgumentException("Student email cannot be empty.");
			if (student.Id == Guid.Empty)
				student.Id = Guid.NewGuid();

			_studentRepository.Add(student);
			return student;
		}

		public Student UpdateStudent(Guid id, Student updatedStudent)
		{
			if (updatedStudent == null)
				throw new ArgumentNullException(nameof(updatedStudent));
			if (string.IsNullOrWhiteSpace(updatedStudent.Name))
				throw new ArgumentException("Student name cannot be empty.");
			if (string.IsNullOrWhiteSpace(updatedStudent.Email))
				throw new ArgumentException("Student email cannot be empty.");

			var existingStudent = _studentRepository.GetById(id);
			if (existingStudent == null)
				throw new KeyNotFoundException("Student not found");

			existingStudent.Name = updatedStudent.Name;
			existingStudent.Email = updatedStudent.Email;
			existingStudent.DateOfBirth = updatedStudent.DateOfBirth;
			existingStudent.PhoneNumber = updatedStudent.PhoneNumber;
			existingStudent.EnrollmentDate = updatedStudent.EnrollmentDate;
			existingStudent.IsActive = updatedStudent.IsActive;

			_studentRepository.Update(existingStudent);

			return existingStudent;
		}

		public void DeleteStudent(Guid id)
		{
			var existingStudent = _studentRepository.GetById(id);
			if (existingStudent == null)
				throw new KeyNotFoundException("Student not found");

			_studentRepository.Delete(id);
		}
	}
}
