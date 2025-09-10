using GNT.Domain.Models;
using GNT.Shared.Dtos.BusinessProducts;

namespace GNT.Application.BusinessProducts.Commands;

public class CreateBusinessProductCommand : IRequest<Guid>
{
    public CreateBusinessProductCommand(CreateBusinessProductDto postModel)
    {
        PostModel = postModel;
    }

    internal CreateBusinessProductDto PostModel { get; set; }
}

internal class CreateBusinessProductCommandHandler : RequestHandler<CreateBusinessProductCommand, Guid>
{
    public CreateBusinessProductCommandHandler(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public override async Task<Guid> Handle(CreateBusinessProductCommand request, CancellationToken cancellationToken)
    {
        var product = BusinessProductMapping.CreateEntity(request.PostModel);

        await appDbContext.BusinessProduct.AddAsync(product, cancellationToken);
        await appDbContext.SaveChangesAsync(cancellationToken);

        return product.Id;
    }
}

public class CreateBusinessProductCommandValidator : AbstractValidator<CreateBusinessProductCommand>
{
    public CreateBusinessProductCommandValidator()
    {

    }
}
