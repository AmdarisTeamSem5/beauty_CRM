using GNT.Application.Account.Utils;
using GNT.Dtos.Enums;
using Microsoft.EntityFrameworkCore;
using GNT.Shared.Errors;
using GNT.Shared.Dtos.UserManagement;

namespace GNT.Application.Account.Commands;

public class LoginCommand : IRequest<TokenDto>
{
    public LoginCommand(string email, string password, string securityCode)
    {
        Email = email;
        Password = password;
        SecurityCode = securityCode;
    }

    public string Email { get; set; }
    public string Password { get; set; }
    public string SecurityCode { get; set; }
}

public class LoginCommandHandler : RequestHandler<LoginCommand, TokenDto>
{
    private readonly JwtService JwtService;

    public LoginCommandHandler(IServiceProvider serviceProvider, JwtService jwtService) : base(serviceProvider)
    {
        JwtService = jwtService;
    }

    public override async Task<TokenDto> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var dbUser = appDbContext.User
        .Where(d => d.Email == request.Email)
        .Include(d => d.UserSecurityCodes.Where(d => d.Type == SecurityCodeTypes.TwoFactorAuthentication).OrderByDescending(d => d.CreatedAt).Take(1))
        .Include(d=>d.UserRoles)
        .ThenInclude(d=>d.Role)
        .ThenInclude(d=>d.RolePermissions)
        .FirstOrDefault();

        if (dbUser == null)
        {
            throw new BusinessException(FailureCode.InvalidCredentials);
        }

        dbUser.ValidatePassword(request.Password);
        dbUser.ValidateStatus();

        var failureReason = dbUser.ValidateUserSecurityCode(request.SecurityCode);

        await appDbContext.SaveChangesAsync(cancellationToken);

        if (failureReason.HasValue)
        {
            throw new BusinessException(failureReason.Value);
        }

        var token = JwtService.GenerateToken(dbUser);

        return token;
    }
}

public class LoginCommandValidator : AbstractValidator<LoginCommand>
{
    public LoginCommandValidator()
    {
        RuleFor(d => d.Email)
            .NotNull()
            .NotEmpty()
            .EmailAddress();

        RuleFor(d => d.Password)
            .NotNull()
            .NotEmpty();

        RuleFor(d => d.SecurityCode)
            .NotNull()
            .NotEmpty();

    }
}