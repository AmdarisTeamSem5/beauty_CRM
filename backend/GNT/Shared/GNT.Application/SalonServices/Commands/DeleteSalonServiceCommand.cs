using Microsoft.EntityFrameworkCore;

namespace GNT.Application.SalonServices.Commands;

public class DeleteSalonServiceCommand : IRequest<Unit>
{
    public DeleteSalonServiceCommand(Guid id)
    {
        Id = id;
    }

    internal Guid Id { get; set; }
}

internal class DeleteSalonServiceCommandHandler : RequestHandler<DeleteSalonServiceCommand, Unit>
{
    public DeleteSalonServiceCommandHandler(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public override async Task<Unit> Handle(DeleteSalonServiceCommand request, CancellationToken cancellationToken)
    {
        var itemToDelete = await appDbContext.SalonService
            .Where(d => d.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken);

        appDbContext.SalonService.Remove(itemToDelete);

        await appDbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
