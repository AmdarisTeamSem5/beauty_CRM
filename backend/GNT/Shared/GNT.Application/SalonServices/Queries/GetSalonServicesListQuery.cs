using GNT.Domain.Models;
using GNT.Shared.Dtos.SalonServices;
using GNT.Shared.Enums;              // PriceBand
using Microsoft.EntityFrameworkCore;

namespace GNT.Application.SalonServices.Queries;

public sealed class GetAllSalonServicesQuery : IRequest<List<SalonServiceDto>>
{
    public PriceBand? Band { get; init; }
    public bool ExcludeSalonServicesWithNoServices { get; init; } = false;
    public string? OrderBy { get; init; }
    public bool Desc { get; init; } = false;

    // NEW: optional filter by salon owner
    public Guid? OwnerId { get; init; }   // <- pass the UserId here
}

internal sealed class GetAllSalonServicesQueryHandler
    : RequestHandler<GetAllSalonServicesQuery, List<SalonServiceDto>>
{
    public GetAllSalonServicesQueryHandler(IServiceProvider sp) : base(sp) { }


    public override async Task<List<SalonServiceDto>> Handle(
        GetAllSalonServicesQuery request,
        CancellationToken ct)
    {
        // Return absolutely all salons, deterministically ordered
        return await appDbContext.SalonService
            .OrderBy(s => s.Id)
            .Select(SalonServiceMapping.DtoProjection)
            .AsNoTracking()
            .ToListAsync(ct);
    }
}
