using GNT.Domain.Models;
using GNT.Shared.Dtos.Specialists;

namespace GNT.Application.Specialists.Commands;

public class CreateSpecialistCommand : IRequest<Guid>
{
    public CreateSpecialistCommand(CreateSpecialistDto postModel)
    {
        PostModel = postModel;
    }

    internal CreateSpecialistDto PostModel { get; set; }
}

internal class CreateSpecialistCommandHandler : RequestHandler<CreateSpecialistCommand, Guid>
{
    public CreateSpecialistCommandHandler(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public override async Task<Guid> Handle(CreateSpecialistCommand request, CancellationToken cancellationToken)
    {
        var product = SpecialistMapping.CreateEntity(request.PostModel);

        await appDbContext.Specialist.AddAsync(product, cancellationToken);
        await appDbContext.SaveChangesAsync(cancellationToken);

        return product.Id;
    }
}

public class CreateSpecialistCommandValidator : AbstractValidator<CreateSpecialistCommand>
{
    public CreateSpecialistCommandValidator()
    {

    }
}
