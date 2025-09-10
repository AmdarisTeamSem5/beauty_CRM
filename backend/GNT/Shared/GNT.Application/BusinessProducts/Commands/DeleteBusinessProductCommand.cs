using Microsoft.EntityFrameworkCore;

namespace GNT.Application.BusinessProducts.Commands;

public class DeleteBusinessProductCommand : IRequest<Unit>
{
    public DeleteBusinessProductCommand(Guid id)
    {
        Id = id;
    }

    internal Guid Id { get; set; }
}

internal class DeleteBusinessProductCommandHandler : RequestHandler<DeleteBusinessProductCommand, Unit>
{
    public DeleteBusinessProductCommandHandler(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public override async Task<Unit> Handle(DeleteBusinessProductCommand request, CancellationToken cancellationToken)
    {
        var itemToDelete = await appDbContext.BusinessProduct
            .Where(d => d.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken);

        appDbContext.BusinessProduct.Remove(itemToDelete);

        await appDbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
