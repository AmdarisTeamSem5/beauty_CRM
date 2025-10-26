using GNT.Domain.Models;
using GNT.Shared.Dtos.Appointments;

namespace GNT.Application.Appointments.Commands;

public class CreateAppointmentCommand : IRequest<Guid>
{
    public CreateAppointmentCommand(CreateAppointmentDto postModel)
    {
        PostModel = postModel;
    }

    internal CreateAppointmentDto PostModel { get; set; }
}

internal class CreateAppointmentCommandHandler : RequestHandler<CreateAppointmentCommand, Guid>
{
    public CreateAppointmentCommandHandler(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public override async Task<Guid> Handle(CreateAppointmentCommand request, CancellationToken cancellationToken)
    {
        var product = AppointmentMapping.CreateEntity(request.PostModel);

        await appDbContext.Appointment.AddAsync(product, cancellationToken);
        await appDbContext.SaveChangesAsync(cancellationToken);

        return product.Id;
    }
}

public class CreateAppointmentCommandValidator : AbstractValidator<CreateAppointmentCommand>
{
    public CreateAppointmentCommandValidator()
    {

    }
}
