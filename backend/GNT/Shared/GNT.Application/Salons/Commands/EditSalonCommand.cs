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
            throw new SalonException(FailureCode.NotFound);
        }

        if (editModel.OwnerId.HasValue)
        {
            dbProduct.OwnerId = editModel.OwnerId.Value;
        }
        if (editModel.Name != null)
        {
            dbProduct.Name = editModel.Name;
        }

        if (editModel.Description != null)
        {
            dbProduct.Description = editModel.Description;
        }

        if (editModel.Address != null)
        {
            dbProduct.Address = editModel.Address;
        }

        dbProduct.Region = editModel.Region.Value;

        if (editModel.Phone != null)
        {
            dbProduct.Phone = editModel.Phone;
        }

        if (editModel.Email != null)
        {
            dbProduct.Email = editModel.Email;
        }


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
