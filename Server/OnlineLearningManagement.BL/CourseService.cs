﻿using OnlineLearningManagement.DAL.Interfaces;
using OnlineLearningManagement.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineLearningManagement.BL
{
	public class CourseService
	{
		private readonly IRepository<Course> _courseRepository;
		private readonly IRepository<Enrolment> _enrolmentRepository; // Direct dependency

		public CourseService(IRepository<Course> courseRepository, IRepository<Enrolment> enrolmentRepository)
		{
			_courseRepository = courseRepository;
			_enrolmentRepository = enrolmentRepository;
		}

		public IEnumerable<Course> GetAllCourses()
		{
			return _courseRepository.GetAll();
		}

		public Course GetCourseById(Guid id)
		{
			var course = _courseRepository.GetById(id);
			if (course == null)
				throw new KeyNotFoundException("Course not found");

			return course;
		}

		public Course AddCourse(Course course)
		{
			ValidateCourse(course);

			if (course.Id == Guid.Empty)
				course.Id = Guid.NewGuid();

			_courseRepository.Add(course);
			return course;
		}

		public Course UpdateCourse(Guid id, Course updatedCourse)
		{			
			ValidateCourse(updatedCourse);

			var existingCourse = _courseRepository.GetById(id);
			if (existingCourse == null)
				throw new KeyNotFoundException("Course not found");

			existingCourse.Name = updatedCourse.Name;
			existingCourse.DurationInHours = updatedCourse.DurationInHours;
			existingCourse.StartDate = updatedCourse.StartDate;
			existingCourse.EndDate = updatedCourse.EndDate;
			existingCourse.DayOfWeek = updatedCourse.DayOfWeek;
			existingCourse.Price = updatedCourse.Price;
			existingCourse.IsActive = updatedCourse.IsActive;

			_courseRepository.Update(existingCourse);

			return existingCourse;
		}

		public void DeleteCourse(Guid id)
		{
			var existingCourse = _courseRepository.GetById(id);
			if (existingCourse == null)
				throw new KeyNotFoundException("Course not found");

			// Delete enrolments directly
			var enrolments = _enrolmentRepository.GetAll()
				.Where(e => e.CourseId == id)
				.ToList();

			foreach (var enrolment in enrolments)
			{
				_enrolmentRepository.Delete(enrolment.Id);
			}

			_courseRepository.Delete(id);
		}

		private void ValidateCourse(Course course)
		{
			if (course == null)
				throw new ArgumentNullException(nameof(course));
			if (string.IsNullOrWhiteSpace(course.Name))
				throw new ArgumentException("Course name cannot be empty.");
			if (course.StartDate > course.EndDate)
				throw new ArgumentException("Start date must be earlier than end date.");
		}
	}

}
