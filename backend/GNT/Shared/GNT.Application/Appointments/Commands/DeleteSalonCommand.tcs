using Microsoft.EntityFrameworkCore;

namespace GNT.Application.Salons.Commands;

public class DeleteSalonCommand : IRequest<Unit>
{
    public DeleteSalonCommand(Guid id)
    {
        Id = id;
    }

    internal Guid Id { get; set; }
}

internal class DeleteSalonCommandHandler : RequestHandler<DeleteSalonCommand, Unit>
{
    public DeleteSalonCommandHandler(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public override async Task<Unit> Handle(DeleteSalonCommand request, CancellationToken cancellationToken)
    {
        var itemToDelete = await appDbContext.Salon
            .Where(d => d.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken);

        appDbContext.Salon.Remove(itemToDelete);

        await appDbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
