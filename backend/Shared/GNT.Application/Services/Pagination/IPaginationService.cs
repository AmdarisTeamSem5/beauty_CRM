using GNT.Shared.Dtos.Pagination;
using System.Linq.Expressions;

namespace GNT.Application
{
    public interface IPaginationService
    {
        Task<PaginatedList<TDestination>> PaginatedResults<TSource, TDestination>(IQueryable<TSource> list, PageQuery query, Expression<Func<TSource, TDestination>> MappingRule);
    }
}