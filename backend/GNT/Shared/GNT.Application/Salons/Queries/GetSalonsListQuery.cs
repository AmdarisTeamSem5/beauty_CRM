using GNT.Domain.Models;
using GNT.Shared.Dtos.Salons;
using GNT.Shared.Dtos.Pagination;
using GNT.Shared.Enums;

namespace GNT.Application.Salons.Queries;
public class SalonListQuery : IRequest<PaginatedList<SalonDto>>
{
    public SalonListQuery(PageQuery pageQuery)
    {
        PageQuery = pageQuery;
        SalonServiceTypes = pageQuery.Filters.FirstOrDefault(f => f.PropertyName == "ServiceTypes")?.Value;
        SalonSearch = pageQuery.Filters.FirstOrDefault(f => f.PropertyName == "Search")?.Value;
    }

    internal PageQuery PageQuery { get; set; }
    public string SalonServiceTypes { get; set; }
    public string SalonSearch { get; set; }
}

internal class SalonListQueryHandler : RequestHandler<SalonListQuery, PaginatedList<SalonDto>>
{
    private readonly IPaginationService paginationService;
    public SalonListQueryHandler(IPaginationService paginationService, IServiceProvider serviceProvider) : base(serviceProvider)
    {
        this.paginationService = paginationService;
    }

    public override async Task<PaginatedList<SalonDto>> Handle(SalonListQuery request, CancellationToken cancellationToken)
    {
        var query = appDbContext.Salon.AsQueryable();

        // Apply service types filter if provided
        if (!string.IsNullOrEmpty(request.SalonServiceTypes))
        {
            var serviceTypeIds = request.SalonServiceTypes
                .Split(',')
                .Select(x => (SalonServiceType)int.Parse(x.Trim()))
                .ToList();

            query = query
                .Join(appDbContext.SalonService,
                    s => s.Id,
                    ss => ss.SalonId,
                    (s, ss) => new { Salon = s, SalonService = ss })
                .Where(joined => serviceTypeIds.Contains(joined.SalonService.Type))
                .Select(joined => joined.Salon)
                .OrderBy(joined => joined.Id)
                .Distinct();
        }

        if (!string.IsNullOrEmpty(request.SalonSearch))
        {
            var valid_tokens = request.SalonSearch?.Split(" ").Where(invalid_token => invalid_token != " ");
            query = query.Where(Salons => valid_tokens.All(token => Salons.Name.Contains(token))).OrderBy(salon => salon.Id).Distinct();
        }

        var page = await paginationService.PaginatedResults(query, request.PageQuery, SalonMapping.DtoProjection);

        return page;
    }
}
