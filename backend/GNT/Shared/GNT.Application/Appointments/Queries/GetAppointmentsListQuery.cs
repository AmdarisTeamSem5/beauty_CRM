using GNT.Domain.Models;
using GNT.Shared.Dtos.Appointments;
using GNT.Shared.Enums;              // PriceBand
using Microsoft.EntityFrameworkCore;

namespace GNT.Application.Appointments.Queries;

public sealed class GetAllAppointmentsQuery : IRequest<List<AppointmentDto>>
{
    public PriceBand? Band { get; init; }
    public bool ExcludeAppointmentsWithNoServices { get; init; } = false;
    public string? OrderBy { get; init; }
    public bool Desc { get; init; } = false;

    // NEW: optional filter by salon owner
    public Guid? OwnerId { get; init; }   // <- pass the UserId here
}

internal sealed class GetAllAppointmentsQueryHandler
    : RequestHandler<GetAllAppointmentsQuery, List<AppointmentDto>>
{
    public GetAllAppointmentsQueryHandler(IServiceProvider sp) : base(sp) { }


    public override async Task<List<AppointmentDto>> Handle(
        GetAllAppointmentsQuery request,
        CancellationToken ct)
    {
        // Return absolutely all salons, deterministically ordered
        return await appDbContext.Appointment
            .OrderBy(s => s.Id)
            .Select(AppointmentMapping.DtoProjection)
            .AsNoTracking()
            .ToListAsync(ct);
    }
}
