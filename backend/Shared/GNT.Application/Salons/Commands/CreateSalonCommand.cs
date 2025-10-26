using GNT.Domain.Models;
using GNT.Shared.Dtos.Salons;

namespace GNT.Application.Salons.Commands;

public class CreateSalonCommand : IRequest<Guid>
{
    public CreateSalonCommand(CreateSalonDto postModel)
    {
        PostModel = postModel;
    }

    internal CreateSalonDto PostModel { get; set; }
}

internal class CreateSalonCommandHandler : RequestHandler<CreateSalonCommand, Guid>
{
    public CreateSalonCommandHandler(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public override async Task<Guid> Handle(CreateSalonCommand request, CancellationToken cancellationToken)
    {
        var product = SalonMapping.CreateEntity(request.PostModel);

        await appDbContext.Salon.AddAsync(product, cancellationToken);
        await appDbContext.SaveChangesAsync(cancellationToken);

        return product.Id;
    }
}

public class CreateSalonCommandValidator : AbstractValidator<CreateSalonCommand>
{
    public CreateSalonCommandValidator()
    {

    }
}
