using GNT.Domain.Models;
using GNT.Shared.Dtos.Appointments;
using Microsoft.EntityFrameworkCore;

namespace GNT.Application.Appointments.Queries;

public class AppointmentQuery : IRequest<AppointmentDto>
{
    public AppointmentQuery(Guid id)
    {
        Id = id;
    }

    internal Guid Id { get; set; }
}

internal class AppointmentQueryHandler : RequestHandler<AppointmentQuery, AppointmentDto>
{
    public AppointmentQueryHandler(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public override async Task<AppointmentDto> Handle(AppointmentQuery request, CancellationToken cancellationToken)
    {
        var businessProduct = await appDbContext.Appointment
            .Where(d => d.Id == request.Id)
            .Select(AppointmentMapping.DtoProjection)
            .FirstOrDefaultAsync(cancellationToken);

        return businessProduct;
    }
}
