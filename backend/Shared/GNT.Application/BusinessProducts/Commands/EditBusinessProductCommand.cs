using GNT.Shared.Errors;
using GNT.Shared.Dtos.BusinessProducts;
using Microsoft.EntityFrameworkCore;

namespace GNT.Application.BusinessProducts.Commands;

public class EditBusinessProductCommand : IRequest<Unit>
{
    public EditBusinessProductCommand(Guid id, EditBusinessProductDto editModel)
    {
        Id = id;
        EditModel = editModel;
    }

    internal Guid Id { get; set; }
    internal EditBusinessProductDto EditModel { get; set; }
}

internal class EditBusinessProductCommandHandler : RequestHandler<EditBusinessProductCommand, Unit>
{
    public EditBusinessProductCommandHandler(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public override async Task<Unit> Handle(EditBusinessProductCommand request, CancellationToken cancellationToken)
    {
        var editModel = request.EditModel;

        var dbProduct = await appDbContext.BusinessProduct
            .Where(d => d.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken);

        if(dbProduct == null)
        {
            throw new BusinessException(FailureCode.NotFound);
        }

        if(editModel.Name != null)
        {
            dbProduct.Name = editModel.Name;
        }

        if (editModel.Price.HasValue)
        {
            dbProduct.Price = editModel.Price.Value;
        }

        if (editModel.Type.HasValue)
        {
            dbProduct.Type = editModel.Type.Value;
        }

        if(editModel.IsInStock.HasValue)
        {
            dbProduct.IsInStock = editModel.IsInStock.Value;
        }

        if(editModel.DatetIn.HasValue)
        {
            dbProduct.DatetIn = editModel.DatetIn.Value;
        }

        if (editModel.DateOut.HasValue)
        {
            dbProduct.DateOut = editModel.DateOut.Value;
        }

        await appDbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}

public class EditBusinessProductCommandValidator : AbstractValidator<EditBusinessProductCommand>
{
    public EditBusinessProductCommandValidator()
    {

    }
}
