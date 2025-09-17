using GNT.Shared.Errors;
using GNT.Shared.Dtos.SalonServices;
using Microsoft.EntityFrameworkCore;

namespace GNT.Application.SalonServices.Commands;

public class EditSalonServiceCommand : IRequest<Unit>
{
    public EditSalonServiceCommand(Guid id, EditSalonServiceDto editModel)
    {
        Id = id;
        EditModel = editModel;
    }

    internal Guid Id { get; set; }
    internal EditSalonServiceDto EditModel { get; set; }
}

internal class EditSalonServiceCommandHandler : RequestHandler<EditSalonServiceCommand, Unit>
{
    public EditSalonServiceCommandHandler(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public override async Task<Unit> Handle(EditSalonServiceCommand request, CancellationToken cancellationToken)
    {
        var editModel = request.EditModel;

        var dbProduct = await appDbContext.SalonService
            .Where(d => d.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken);

        if (dbProduct == null)
        {
            throw new SalonServiceException(FailureCode.NotFound);
        }

        if (editModel.SalonId.HasValue)
        {
            dbProduct.SalonId = editModel.SalonId.Value;
        }
        if (editModel.Name != null)
        {
            dbProduct.Name = editModel.Name;
        }

        if (editModel.Description != null)
        {
            dbProduct.Description = editModel.Description;
        }

        if (editModel.Type.HasValue)
        {
            dbProduct.Type = editModel.Type.Value;
        }

        dbProduct.SpecialistId = editModel.SpecialistId.Value;

        if (editModel.DurationMinutes.HasValue)
        {
            dbProduct.DurationMinutes = editModel.DurationMinutes.Value;
        }

        if (editModel.PriceMDL.HasValue)
        {
            dbProduct.PriceMDL = editModel.PriceMDL.Value;
        }
        await appDbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}

public class EditSalonServiceCommandValidator : AbstractValidator<EditSalonServiceCommand>
{
    public EditSalonServiceCommandValidator()
    {

    }
}
