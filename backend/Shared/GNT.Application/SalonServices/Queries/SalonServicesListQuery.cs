using GNT.Domain.Models;
using GNT.Shared.Dtos.SalonServices;
using GNT.Shared.Dtos.Pagination;

namespace GNT.Application.SalonServices.Queries;

public class SalonServiceListQuery : IRequest<PaginatedList<SalonServiceDto>>
{
    public SalonServiceListQuery(PageQuery pageQuery)
    {
        PageQuery = pageQuery;
    }

    internal PageQuery PageQuery { get; set; }
}

internal class SalonServiceListQueryHandler : RequestHandler<SalonServiceListQuery, PaginatedList<SalonServiceDto>>
{
    private readonly IPaginationService paginationService;
    public SalonServiceListQueryHandler(IPaginationService paginationService, IServiceProvider serviceProvider) : base(serviceProvider)
    {
        this.paginationService = paginationService;
    }

    public override async Task<PaginatedList<SalonServiceDto>> Handle(SalonServiceListQuery request, CancellationToken cancellationToken)
    {
        var query = appDbContext.SalonService.AsQueryable();

        var page = await paginationService.PaginatedResults(query, request.PageQuery, SalonServiceMapping.DtoProjection);

        return page;
    }
}
