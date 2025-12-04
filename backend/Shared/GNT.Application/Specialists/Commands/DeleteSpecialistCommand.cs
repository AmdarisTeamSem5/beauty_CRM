using Microsoft.EntityFrameworkCore;

namespace GNT.Application.Specialists.Commands;

public class DeleteSpecialistCommand : IRequest<Unit>
{
    public DeleteSpecialistCommand(Guid id)
    {
        Id = id;
    }

    internal Guid Id { get; set; }
}

internal class DeleteSpecialistCommandHandler : RequestHandler<DeleteSpecialistCommand, Unit>
{
    public DeleteSpecialistCommandHandler(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public override async Task<Unit> Handle(DeleteSpecialistCommand request, CancellationToken cancellationToken)
    {
        var itemToDelete = await appDbContext.Specialist
            .Where(d => d.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken);

        appDbContext.Specialist.Remove(itemToDelete);

        await appDbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
