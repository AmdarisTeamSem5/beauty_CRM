using GNT.Shared.Dtos.PriceBandOptions;
using GNT.Shared.Dtos.Pricing;       // PriceBandOptionDto
using GNT.Shared.Dtos.Salons;        // SalonPriceSummaryDto
using GNT.Shared.Enums;              // PriceBand
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GNT.Application.Salons.Queries;

// Request
public class FilterSalonsByPriceQuery : IRequest<List<SalonPriceSummaryDto>>
{
    public FilterSalonsByPriceQuery(PriceBandOptionDto options)
    {
        Options = options;
    }

    internal PriceBandOptionDto Options { get; }
}

// Handler (uses your base RequestHandler with IServiceProvider)
internal class FilterSalonsByPriceQueryHandler
    : RequestHandler<FilterSalonsByPriceQuery, List<SalonPriceSummaryDto>>
{
    // TODO: replace with config (IOptions) or DB row if you want.
    private const decimal LowMax = 200m;
    private const decimal MediumMax = 400m;

    public FilterSalonsByPriceQueryHandler(IServiceProvider serviceProvider)
        : base(serviceProvider) { }

    public override async Task<List<SalonPriceSummaryDto>> Handle(
        FilterSalonsByPriceQuery request,
        CancellationToken cancellationToken)
    {
        var o = request.Options;

        // Aggregate services once (per salon)
        var grouped =
            from ss in appDbContext.SalonService
            group ss by ss.SalonId into g
            select new
            {
                SalonId = g.Key,
                Avg = g.Average(x => (decimal)x.PriceMDL),
                Cnt = g.Count()
            };

        IQueryable<SalonPriceSummaryDto> q;

        if (o.ExcludeSalonsWithNoServices)
        {
            // Inner join: only salons that have at least one service
            q =
                from s in appDbContext.Salon
                join g in grouped on s.Id equals g.SalonId
                let band = g.Avg <= LowMax
                    ? PriceBand.Low
                    : (g.Avg <= MediumMax ? PriceBand.Medium : PriceBand.High)
                select new SalonPriceSummaryDto
                {
                    SalonId = s.Id,
                    Name = s.Name,
                    AvgPrice = g.Avg,
                    ServicesCount = g.Cnt,
                    Band = band
                };
        }
        else
        {
            // Left join: include salons with zero services
            q =
                from s in appDbContext.Salon
                join g in grouped on s.Id equals g.SalonId into gj
                from g in gj.DefaultIfEmpty()
                let avg = (decimal?)g!.Avg
                let cnt = g == null ? 0 : g.Cnt
                let band = avg == null
                    ? (PriceBand?)null
                    : (avg <= LowMax
                        ? PriceBand.Low
                        : (avg <= MediumMax ? PriceBand.Medium : PriceBand.High))
                select new SalonPriceSummaryDto
                {
                    SalonId = s.Id,
                    Name = s.Name,
                    AvgPrice = avg,
                    ServicesCount = cnt,
                    Band = band
                };
        }

        // Optional filter by band
        if (o.Band.HasValue)
            q = q.Where(x => x.Band == o.Band.Value);

        // Sorting
        q = (o.OrderBy ?? "AvgPrice").ToLowerInvariant() switch
        {
            "name" => o.Desc ? q.OrderByDescending(x => x.Name)
                             : q.OrderBy(x => x.Name),
            _ => o.Desc ? q.OrderByDescending(x => x.AvgPrice)
                             : q.OrderBy(x => x.AvgPrice),
        };

        return await q.AsNoTracking().ToListAsync(cancellationToken);
    }
}
