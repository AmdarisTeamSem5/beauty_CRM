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

        var query = appDbContext.Salon.AsQueryable();

        if (request.Band.HasValue)
            query = query.Where(s => s.Band == request.Band.Value);

        if (request.ExcludeSalonsWithNoServices)
            query = query.Where(s => appDbContext.SalonService.Any(ss => ss.SalonId == s.Id));

        if (request.OwnerId.HasValue)
            query = query.Where(s => s.OwnerId == request.OwnerId.Value);

        query = request.OrderBy?.ToLower() switch
        {
            "name" => request.Desc ? query.OrderByDescending(s => s.Name) : query.OrderBy(s => s.Name),
            "priceband" => request.Desc ? query.OrderByDescending(s => s.Band) : query.OrderBy(s => s.Band),
            _ => query.OrderBy(s => s.Id)
        };

        return await query
            .Select(SalonMapping.DtoProjection)
            .AsNoTracking()
            .ToListAsync(ct);

    }
}
