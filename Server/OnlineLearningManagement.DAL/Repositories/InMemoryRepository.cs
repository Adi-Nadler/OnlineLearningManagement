using OnlineLearningManagement.DAL.Interfaces;
using OnlineLearningManagement.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace OnlineLearningManagement.DAL.Repositories
{
	public class InMemoryDictionaryRepository<T> : IRepository<T> where T : class, IEntity
	{
		protected readonly Dictionary<Guid, T> _entities = new();

		public IEnumerable<T> GetAll() => _entities.Values;

		public T? GetById(Guid id) => _entities.TryGetValue(id, out var entity) ? entity : null;

		public void Add(T entity)
		{
			if (!_entities.ContainsKey(entity.Id))
				_entities[entity.Id] = entity;
		}

		public void Update(T entity)
		{
			if (_entities.ContainsKey(entity.Id))
				_entities[entity.Id] = entity;
		}

		public void Delete(Guid id)
		{
			_entities.Remove(id);
		}
	}

}
