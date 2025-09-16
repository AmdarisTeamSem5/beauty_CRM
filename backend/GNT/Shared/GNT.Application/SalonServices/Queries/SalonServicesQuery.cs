using GNT.Domain.Models;
using GNT.Shared.Dtos.SalonServices;
using Microsoft.EntityFrameworkCore;

namespace GNT.Application.SalonServices.Queries;

public class SalonServiceQuery : IRequest<SalonServiceDto>
{
    public SalonServiceQuery(Guid id)
    {
        Id = id;
    }

    internal Guid Id { get; set; }
}

internal class SalonServiceQueryHandler : RequestHandler<SalonServiceQuery, SalonServiceDto>
{
    public SalonServiceQueryHandler(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public override async Task<SalonServiceDto> Handle(SalonServiceQuery request, CancellationToken cancellationToken)
    {
        var businessProduct = await appDbContext.SalonService
            .Where(d => d.Id == request.Id)
            .Select(SalonServiceMapping.DtoProjection)
            .FirstOrDefaultAsync(cancellationToken);

        return businessProduct;
    }
}
