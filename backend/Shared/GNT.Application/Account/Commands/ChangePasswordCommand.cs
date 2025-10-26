using GNT.Application.Account.Utils;
using GNT.Common.Extensions;
using GNT.Shared.Errors;

namespace GNT.Application.Account.Commands;

public class ChangePasswordCommand : IRequest<Unit>
{
    public ChangePasswordCommand(string currentPassword, string newPassword)
    {
        CurrentPassword = currentPassword;
        NewPassword = newPassword;
    }

    public string CurrentPassword { get; set; }
    public string NewPassword { get; set; }
}

public class ChangePasswordCommandHandler : RequestHandler<ChangePasswordCommand, Unit>
{
    public ChangePasswordCommandHandler(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public override async Task<Unit> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
    {
        var user = appDbContext.User.First(d => d.Id == CurrentUser.Id);

        user.ValidatePassword(request.CurrentPassword);

        user.Password = AccountService.HashPassword(request.NewPassword);
        
        await appDbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}

public class ChangePasswordCommandValidator : AbstractValidator<ChangePasswordCommand>
{
    public ChangePasswordCommandValidator()
    {
        RuleFor(d => d.NewPassword)
            .Must(d => d.IsAValidPasswordPattern())
            .WithState(d => FailureCode.InternalError);
    }
}
