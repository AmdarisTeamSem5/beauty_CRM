using GNT.Shared.Errors;
using GNT.Shared.Dtos.Salons;
using Microsoft.EntityFrameworkCore;

namespace GNT.Application.Salons.Commands;

public class EditSalonCommand : IRequest<Unit>
{
    public EditSalonCommand(Guid id, EditSalonDto editModel)
    {
        Id = id;
        EditModel = editModel;
    }

    internal Guid Id { get; set; }
    internal EditSalonDto EditModel { get; set; }
}

internal class EditSalonCommandHandler : RequestHandler<EditSalonCommand, Unit>
{
    public EditSalonCommandHandler(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public override async Task<Unit> Handle(EditSalonCommand request, CancellationToken cancellationToken)
    {
        var editModel = request.EditModel;

        var dbProduct = await appDbContext.Salon
            .Where(d => d.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken);

        if (dbProduct == null)
        {
            throw new BusinessException(FailureCode.NotFound);
        }
        // TODO:Adrian Implement this

        // if (editModel.Name != null)
        // {
        //     dbProduct.Name = editModel.Name;
        // }
        //
        // if (editModel.Price.HasValue)
        // {
        //     dbProduct.Price = editModel.Price.Value;
        // }
        //
        // if (editModel.Type.HasValue)
        // {
        //     dbProduct.Type = editModel.Type.Value;
        // }
        //
        // if (editModel.IsInStock.HasValue)
        // {
        //     dbProduct.IsInStock = editModel.IsInStock.Value;
        // }
        //
        // if (editModel.DatetIn.HasValue)
        // {
        //     dbProduct.DatetIn = editModel.DatetIn.Value;
        // }
        //
        // if (editModel.DateOut.HasValue)
        // {
        //     dbProduct.DateOut = editModel.DateOut.Value;
        // }
        //
        await appDbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}

public class EditSalonCommandValidator : AbstractValidator<EditSalonCommand>
{
    public EditSalonCommandValidator()
    {

    }
}
