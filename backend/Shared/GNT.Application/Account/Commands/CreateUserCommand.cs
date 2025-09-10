using GNT.Application.Account.Utils;
using GNT.Application.Interfaces;
using GNT.Domain.Models;
using GNT.Dtos.Enums;
using GNT.Shared.Errors;
using GNT.Shared.Dtos.UserManagement;
using System.Reflection;
using System.Web;

namespace GNT.Application.Account.Commands;

public class CreateUserCommand : IRequest<Guid>
{
    public CreateUserCommand(CreateUserDto postModel)
    {
        PostModel = postModel;
    }

    internal CreateUserDto PostModel { get; set; }
}

public class CreateUserCommandHandler : RequestHandler<CreateUserCommand, Guid>
{
    private readonly IEmailService EmailService;

    public CreateUserCommandHandler(IServiceProvider serviceProvider, IEmailService emailService) : base(serviceProvider)
    {
        EmailService = emailService;
    }

    public override async Task<Guid> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var newUser = request.PostModel.CreateEntity();

        if(appDbContext.User.Any(d => d.Email.ToLower() == request.PostModel.Email.ToLower()))
        {
            throw new BusinessException(FailureCode.DuplicateEmail);
        }

        newUser.GenerateUserSecurityCode(SecurityCodeTypes.ResetPassword);

        await appDbContext.AddAndSaveChangesAsync(newUser, cancellationToken);

        SendRegistrationEmail(newUser.Email, newUser.FirstName, newUser.UserSecurityCodes.First().Code, newUser.UserSecurityCodes.First().ExpiresAt);

        return newUser.Id;
    }

    private void SendRegistrationEmail(string email, string firstName, string securityCode, DateTime expiresAt)
    {
        var assemblyPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location) + "\\EmailTemplates";
        var template = File.ReadAllText(assemblyPath + "\\NewUserCreated.html");

        var encodedEmail = HttpUtility.UrlEncode(email);

        template = template.Replace("{BaseUrl}", ClientUrl)
            .Replace("{EmailAddress}", encodedEmail)
            .Replace("{ExpiresAt}", expiresAt.ToString("dd.MM.yyyy HH:mm"))
            .Replace("{SecurityCode}", securityCode)
            .Replace("{FirstName}", firstName);

        EmailService.QuickSendAsync("Welcome", template, email);
    }
}

public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
{
    public CreateUserCommandValidator()
    {
        RuleFor(d=>d.PostModel.Email)
            .NotNull()
            .NotEmpty()
            .EmailAddress()
            .WithState(d => FailureCode.InvalidEmailAddress);
    }

}
