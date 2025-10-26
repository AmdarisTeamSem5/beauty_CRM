using GNT.Domain.Models;
using GNT.Shared.Dtos.Salons;
using Microsoft.EntityFrameworkCore;

namespace GNT.Application.Salons.Queries;

public class SalonQuery : IRequest<SalonDto>
{
    public SalonQuery(Guid id)
    {
        Id = id;
    }

    internal Guid Id { get; set; }
}

internal class SalonQueryHandler : RequestHandler<SalonQuery, SalonDto>
{
    public SalonQueryHandler(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public override async Task<SalonDto> Handle(SalonQuery request, CancellationToken cancellationToken)
    {
        var businessProduct = await appDbContext.Salon
            .Where(d => d.Id == request.Id)
            .Select(SalonMapping.DtoProjection)
            .FirstOrDefaultAsync(cancellationToken);

        return businessProduct;
    }
}
