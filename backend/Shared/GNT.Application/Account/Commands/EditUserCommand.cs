using GNT.Application.Interfaces;
using GNT.Shared.Dtos.UserManagement;
using Microsoft.Extensions.DependencyInjection;

namespace GNT.Application.Account.Commands;

public class EditUserCommand : IRequest<Unit>
{
    public EditUserCommand()
    {
    }

    public EditUserCommand(Guid id, EditUserDto postModel)
    {
        Id = id;
        FirstName = postModel.FirstName;
        LastName = postModel.LastName;
        IsBlocked = postModel.IsBlocked;
    }

    internal Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public bool? IsBlocked { get; set; }
}

public class EditUserCommandHandler : RequestHandler<EditUserCommand, Unit>
{
    public EditUserCommandHandler(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public override async Task<Unit> Handle(EditUserCommand request, CancellationToken cancellationToken)
    {
        if (request.Id == Guid.Empty)
        {
            request.Id = CurrentUser.Id;
        }

        var administrationUser = appDbContext.User
            .First(d => d.Id == request.Id);

        if (request.IsBlocked.HasValue)
        {
            administrationUser.IsBlocked = request.IsBlocked.Value;
        }

        if (!string.IsNullOrEmpty(request.FirstName))
        {
            administrationUser.FirstName = request.FirstName;
        }
        
        if (!string.IsNullOrEmpty(request.LastName))
        {
            administrationUser.LastName = request.LastName;
        }

        await appDbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}

public class EditUserCommandValidator : AbstractValidator<EditUserCommand>
{

    public EditUserCommandValidator()
    {
    }
}
