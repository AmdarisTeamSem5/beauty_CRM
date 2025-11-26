using Microsoft.EntityFrameworkCore;

namespace GNT.Application.Appointments.Commands;

public class DeleteAppointmentCommand : IRequest<Unit>
{
    public DeleteAppointmentCommand(Guid id)
    {
        Id = id;
    }

    internal Guid Id { get; set; }
}

internal class DeleteAppointmentCommandHandler : RequestHandler<DeleteAppointmentCommand, Unit>
{
    public DeleteAppointmentCommandHandler(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public override async Task<Unit> Handle(DeleteAppointmentCommand request, CancellationToken cancellationToken)
    {
        var itemToDelete = await appDbContext.Appointment
            .Where(d => d.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken);

        if (itemToDelete != null)
        {
            appDbContext.Appointment.Remove(itemToDelete);
            await appDbContext.SaveChangesAsync(cancellationToken);
        }

        return Unit.Value;
    }
}

