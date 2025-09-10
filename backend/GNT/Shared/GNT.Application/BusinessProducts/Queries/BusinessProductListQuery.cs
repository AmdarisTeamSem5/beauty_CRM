using GNT.Domain.Models;
using GNT.Shared.Dtos.BusinessProducts;
using GNT.Shared.Dtos.Pagination;

namespace GNT.Application.BusinessProducts.Queries;

public class BusinessProductListQuery : IRequest<PaginatedList<BusinessProductDto>>
{
    public BusinessProductListQuery(PageQuery pageQuery)
    {
        PageQuery = pageQuery;
    }

    internal PageQuery PageQuery { get; set; }
}

internal class BusinessProductListQueryHandler : RequestHandler<BusinessProductListQuery, PaginatedList<BusinessProductDto>>
{
    private readonly IPaginationService paginationService;
    public BusinessProductListQueryHandler(IPaginationService paginationService, IServiceProvider serviceProvider) : base(serviceProvider)
    {
        this.paginationService = paginationService;
    }

    public override async Task<PaginatedList<BusinessProductDto>> Handle(BusinessProductListQuery request, CancellationToken cancellationToken)
    {
        var query = appDbContext.BusinessProduct.AsQueryable();

        var page = await paginationService.PaginatedResults(query, request.PageQuery, BusinessProductMapping.DtoProjection);

        return page;
    }
}