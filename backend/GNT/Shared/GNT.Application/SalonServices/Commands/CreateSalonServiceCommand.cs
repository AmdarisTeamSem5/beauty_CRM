using GNT.Domain.Models;
using GNT.Shared.Dtos.SalonServices;

namespace GNT.Application.SalonServices.Commands;

public class CreateSalonServiceCommand : IRequest<Guid>
{
    public CreateSalonServiceCommand(CreateSalonServiceDto postModel)
    {
        PostModel = postModel;
    }

    internal CreateSalonServiceDto PostModel { get; set; }
}

internal class CreateSalonServiceCommandHandler : RequestHandler<CreateSalonServiceCommand, Guid>
{
    public CreateSalonServiceCommandHandler(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public override async Task<Guid> Handle(CreateSalonServiceCommand request, CancellationToken cancellationToken)
    {
        var product = SalonServiceMapping.CreateEntity(request.PostModel);

        await appDbContext.SalonService.AddAsync(product, cancellationToken);
        await appDbContext.SaveChangesAsync(cancellationToken);

        return product.Id;
    }
}

public class CreateSalonServiceCommandValidator : AbstractValidator<CreateSalonServiceCommand>
{
    public CreateSalonServiceCommandValidator()
    {

    }
}
