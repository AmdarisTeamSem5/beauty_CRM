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

    // thresholds (adjust or move to config later)
    private const decimal LowMax = 200m;
    private const decimal MediumMax = 400m;

    public override async Task<List<SalonDto>> Handle(
        GetAllSalonsQuery request,
        CancellationToken ct)
    {
        // Start from ALL salons and apply Owner filter first (works for both paths)
        IQueryable<Domain.Models.Salon> baseQuery = appDbContext.Salon;

        if (request.OwnerId.HasValue)
            baseQuery = baseQuery.Where(s => s.OwnerId == request.OwnerId.Value);

        // If NO price-related knobs are used AND no price ordering -> just return salons (with optional OwnerId filter)
        bool usesPriceJoin =
            request.Band.HasValue ||
            request.ExcludeSalonsWithNoServices ||
            string.Equals(request.OrderBy, "AvgPrice", StringComparison.OrdinalIgnoreCase);

        if (!usesPriceJoin)
        {
            var ordered = (request.OrderBy ?? "Id").ToLowerInvariant() switch
            {
                "name" => request.Desc
                    ? baseQuery.OrderByDescending(s => s.Name)
                    : baseQuery.OrderBy(s => s.Name),
                _ => request.Desc
                    ? baseQuery.OrderByDescending(s => s.Id)
                    : baseQuery.OrderBy(s => s.Id),
            };

            return await ordered
                .Select(SalonMapping.DtoProjection)
                .AsNoTracking()
                .ToListAsync(ct);
        }

        // ---- price-aware path (still respects OwnerId) ----
        var grouped =
            from ss in appDbContext.SalonService
            group ss by ss.SalonId into g
            select new
            {
                SalonId = g.Key,
                Avg = g.Average(x => (decimal)x.PriceMDL),
                Cnt = g.Count()
            };

        var q =
            from s in baseQuery                             // <- note baseQuery (OwnerId already applied)
            join g in grouped on s.Id equals g.SalonId into gj
            from g in gj.DefaultIfEmpty()
            let avg = (decimal?)g!.Avg
            let cnt = g == null ? 0 : g.Cnt
            let band = avg == null
                ? (PriceBand?)null
                : (avg <= LowMax
                    ? PriceBand.Low
                    : (avg <= MediumMax ? PriceBand.Medium : PriceBand.High))
            select new
            {
                Salon = s,
                Avg = avg,
                Cnt = cnt,
                Band = band
            };

        if (request.ExcludeSalonsWithNoServices)
            q = q.Where(x => x.Cnt > 0);

        if (request.Band.HasValue)
            q = q.Where(x => x.Band == request.Band.Value);

        var order = (request.OrderBy ?? "Id").ToLowerInvariant();
        q = order switch
        {
            "avgprice" => request.Desc ? q.OrderByDescending(x => x.Avg) : q.OrderBy(x => x.Avg),
            "name" => request.Desc ? q.OrderByDescending(x => x.Salon.Name) : q.OrderBy(x => x.Salon.Name),
            _ => request.Desc ? q.OrderByDescending(x => x.Salon.Id) : q.OrderBy(x => x.Salon.Id),
        };

        return await q
            .Select(x => x.Salon)
            .Select(SalonMapping.DtoProjection)
            .AsNoTracking()
            .ToListAsync(ct);
    }
}
