using GNT.Domain.Models;
using GNT.Shared.Dtos.BusinessProducts;
using Microsoft.EntityFrameworkCore;

namespace GNT.Application.BusinessProducts.Queries;

public class BusinessProductQuery : IRequest<BusinessProductDto>
{
    public BusinessProductQuery(Guid id)
    {
        Id = id;
    }

    internal Guid Id { get; set; }
}

internal class BusinessProductQueryHandler : RequestHandler<BusinessProductQuery, BusinessProductDto>
{
    public BusinessProductQueryHandler(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public override async Task<BusinessProductDto> Handle(BusinessProductQuery request, CancellationToken cancellationToken)
    {
        var businessProduct = await appDbContext.BusinessProduct
            .Where(d => d.Id == request.Id)
            .Select(BusinessProductMapping.DtoProjection)
            .FirstOrDefaultAsync(cancellationToken);

        return businessProduct;
    }
}
