using GNT.Domain.Models;
using GNT.Shared.Dtos.Specialists;
using GNT.Shared.Enums;              // PriceBand
using Microsoft.EntityFrameworkCore;

namespace GNT.Application.Specialists.Queries;

public sealed class GetAllSpecialistsQuery : IRequest<List<SpecialistDto>>
{
    public string? OrderBy { get; init; }
    public bool Desc { get; init; } = false;
}

internal sealed class GetAllSpecialistsQueryHandler
    : RequestHandler<GetAllSpecialistsQuery, List<SpecialistDto>>
{
    public GetAllSpecialistsQueryHandler(IServiceProvider sp) : base(sp) { }


    public override async Task<List<SpecialistDto>> Handle(
        GetAllSpecialistsQuery request,
        CancellationToken ct)
    {
        // Return absolutely all salons, deterministically ordered
        return await appDbContext.Specialist
            .OrderBy(s => s.Id)
            .Select(SpecialistMapping.DtoProjection)
            .AsNoTracking()
            .ToListAsync(ct);
    }
}
