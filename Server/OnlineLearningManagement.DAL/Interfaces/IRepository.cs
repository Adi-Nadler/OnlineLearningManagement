﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineLearningManagement.DAL.Interfaces
{
	public interface IRepository<T>
	{
		IEnumerable<T> GetAll();
		T GetById(Guid id);
		void Add(T entity);
		void Update(T entity);
		void Delete(Guid id);
	}

}
