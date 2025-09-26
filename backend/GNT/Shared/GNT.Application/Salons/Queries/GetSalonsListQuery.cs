using GNT.Domain.Models;
using GNT.Shared.Dtos.Salons;
using GNT.Shared.Enums;              // PriceBand
using Microsoft.EntityFrameworkCore;

namespace GNT.Application.Salons.Queries;

public sealed class GetAllSalonsQuery : IRequest<List<SalonDto>>
{
    public PriceBand? Band { get; init; }
    public bool ExcludeSalonsWithNoServices { get; init; } = false;
    public string? OrderBy { get; init; }
    public bool Desc { get; init; } = false;

    // NEW: optional filter by salon owner
    public Guid? OwnerId { get; init; }   // <- pass the UserId here
}

internal sealed class GetAllSalonsQueryHandler
    : RequestHandler<GetAllSalonsQuery, List<SalonDto>>
{
    public GetAllSalonsQueryHandler(IServiceProvider sp) : base(sp) { }


    public override async Task<List<SalonDto>> Handle(
        GetAllSalonsQuery request,
        CancellationToken ct)
    {
        // Return absolutely all salons, deterministically ordered
        return await appDbContext.Salon
            .OrderBy(s => s.Id)
            .Select(SalonMapping.DtoProjection)
            .AsNoTracking()
            .ToListAsync(ct);
    }
}
