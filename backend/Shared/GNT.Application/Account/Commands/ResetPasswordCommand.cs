using GNT.Application.Account.Utils;
using GNT.Common.Extensions;
using GNT.Dtos.Enums;
using GNT.Shared.Errors;
using GNT.Shared.Dtos.UserManagement;
using Microsoft.EntityFrameworkCore;

namespace GNT.Application.Account.Commands;

public class ResetPasswordCommand : IRequest<Unit>
{
    public ResetPasswordCommand(ResetPasswordDto model)
    {
        Model = model;
    }

    public ResetPasswordDto Model { get; set; }
}

public class ResetPasswordCommandHandler : RequestHandler<ResetPasswordCommand, Unit>
{

    public ResetPasswordCommandHandler(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public override async Task<Unit> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
    {
        var requestModel = request.Model;

        var dbUser = appDbContext.User
            .Where(d => d.Email == requestModel.Email)
            .Include(d => d.UserSecurityCodes.Where(d => d.Type == SecurityCodeTypes.ResetPassword).OrderByDescending(d => d.CreatedAt).Take(1))
            .FirstOrDefault();

        dbUser.ValidateStatus();

        var failureReason = dbUser.ValidateUserSecurityCode(request.Model.SecurityCode);

        await appDbContext.SaveChangesAsync(cancellationToken);

        if (failureReason.HasValue)
        {
            throw new BusinessException(failureReason.Value);
        }

        dbUser.Password = AccountService.HashPassword(requestModel.NewPassword);
        dbUser.UserSecurityCodes.Single().SuccessfullyUsed = true;

        await appDbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}

public class ResetPasswordCommandValidator : AbstractValidator<ResetPasswordCommand>
{
    public ResetPasswordCommandValidator()
    {
        RuleFor(d => d.Model.NewPassword)
            .Matches(StringExtensions.PasswordValidationExpression)
            .WithState(d=> FailureCode.InvalidPasswordPattern);
    }
}
