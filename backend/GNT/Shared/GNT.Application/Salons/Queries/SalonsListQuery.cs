using GNT.Domain.Models;
using GNT.Shared.Dtos.Salons;
using GNT.Shared.Dtos.Pagination;

namespace GNT.Application.Salons.Queries;

public class SalonListQuery : IRequest<PaginatedList<SalonDto>>
{
    public SalonListQuery(PageQuery pageQuery)
    {
        PageQuery = pageQuery;
    }

    internal PageQuery PageQuery { get; set; }
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

        var page = await paginationService.PaginatedResults(query, request.PageQuery, SalonMapping.DtoProjection);

        return page;
    }
}
