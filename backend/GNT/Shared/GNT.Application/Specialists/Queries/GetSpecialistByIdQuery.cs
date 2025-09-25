using GNT.Domain.Models;
using GNT.Shared.Dtos.Specialists;
using Microsoft.EntityFrameworkCore;

namespace GNT.Application.Specialists.Queries;

public class SpecialistQuery : IRequest<SpecialistDto>
{
    public SpecialistQuery(Guid id)
    {
        Id = id;
    }

    internal Guid Id { get; set; }
}

internal class SpecialistQueryHandler : RequestHandler<SpecialistQuery, SpecialistDto>
{
    public SpecialistQueryHandler(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public override async Task<SpecialistDto> Handle(SpecialistQuery request, CancellationToken cancellationToken)
    {
        var businessProduct = await appDbContext.Specialist
            .Where(d => d.Id == request.Id)
            .Select(SpecialistMapping.DtoProjection)
            .FirstOrDefaultAsync(cancellationToken);

        return businessProduct;
    }
}
