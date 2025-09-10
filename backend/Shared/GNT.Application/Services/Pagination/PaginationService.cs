using System.Drawing.Printing;
using System.Linq.Expressions;
using System.Linq.Dynamic.Core;
using GNT.Shared.Dtos.Pagination;
using Microsoft.EntityFrameworkCore;

namespace GNT.Application
{
    public class PaginationService : IPaginationService
    {
        public PaginatedList<T> PaginatedResults<T>(IQueryable<T> query, PageQuery pageMetadata)
        {
            var count = query.Count();
            var items = query.Skip((pageMetadata.Page - 1) * pageMetadata.PageSize).Take(pageMetadata.PageSize).ToList();

            var pageSummary = new PageSummary
            {
                TotalCount = count,
                PageSize = pageMetadata.PageSize,
                CurrentPage = pageMetadata.Page
            };

            return new PaginatedList<T>(items, pageSummary);

        }

        public async Task<PaginatedList<TDestination>> PaginatedResults<TSource, TDestination>(IQueryable<TSource> query, PageQuery pagedQuery, Expression<Func<TSource, TDestination>> MappingRule)
        {
            var count = query.Count();

            var projectedQuery = query.Select(MappingRule);

            if (pagedQuery.SortBy.Any())
            {
                var firstSort = $"{pagedQuery.SortBy.First().Key}" + (pagedQuery.SortBy.First().Value ? " DESC" : "");

                var orderedQuery = projectedQuery
                    .OrderBy(firstSort);

                if (pagedQuery.SortBy.Count > 1)
                {
                    foreach (var orderOption in pagedQuery.SortBy.Skip(1))
                    {
                        var orderQuery = $"{orderOption.Key}" + (orderOption.Value ? "DESC" : "");

                        orderedQuery = orderedQuery.ThenBy(orderQuery);
                    }
                }

                projectedQuery = orderedQuery;
            }

            var items = await projectedQuery.Skip((pagedQuery.Page - 1) * pagedQuery.PageSize)
                .Take(pagedQuery.PageSize)
                .ToListAsync();

            var pageSummary = new PageSummary
            {
                TotalCount = count,
                PageSize = pagedQuery.PageSize,
                CurrentPage = pagedQuery.Page
            };

            return new PaginatedList<TDestination>(items, pageSummary);
        }
    }
}