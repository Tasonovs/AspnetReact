using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspnetReact.Data
{
	public static class DbExtensions
	{
        public static TEnt
            FindAndAddIfNotExists<TEnt, TKey>(this DbSet<TEnt> dbSet, TEnt entity, Func<TEnt, TKey> predicate) where TEnt : class
        {
            var exists = dbSet.Any(c => predicate(entity).Equals(predicate(c)));
            return exists ? entity : dbSet.Add(entity).Entity;
        }

        public static void AddRangeIfNotExists<TEnt, TKey>(this DbSet<TEnt> dbSet, IEnumerable<TEnt> entities, Func<TEnt, TKey> predicate) where TEnt : class
        {
            var entitiesExist = from ent in dbSet
                                where entities.Any(add => predicate(ent).Equals(predicate(add)))
                                select ent;

            dbSet.AddRange(entities.Except(entitiesExist));
        }
    }

}
