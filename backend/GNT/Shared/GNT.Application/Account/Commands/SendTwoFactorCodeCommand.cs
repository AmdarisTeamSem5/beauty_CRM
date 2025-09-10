using GNT.Application.Account.Utils;
using GNT.Application.Interfaces;
using GNT.Domain.Models;
using GNT.Dtos.Enums;
using GNT.Shared.Errors;
using System.Reflection;

namespace GNT.Application.Account.Commands;

public class SendTwoFactorCodeCommand : IRequest<Unit>
{
    public SendTwoFactorCodeCommand(string email, string password)
    {
        Email = email;
        Password = password;
    }

    public string Email { get; set; }
    public string Password { get; set; }
}

public class SendTwoFacttorCodeCommandHandler : RequestHandler<SendTwoFactorCodeCommand, Unit>
{
    private readonly IEmailService emailService;

    public SendTwoFacttorCodeCommandHandler(IEmailService emailService, IServiceProvider serviceProvider) : base(serviceProvider)
    {
        this.emailService = emailService;
    }

    public async override Task<Unit> Handle(SendTwoFactorCodeCommand request, CancellationToken cancellationToken)
    {
        var dbUser = appDbContext.User
        .Where(d => d.Email == request.Email)
        .FirstOrDefault();

        if (dbUser == null)
        {
            throw new BusinessException(FailureCode.InvalidCredentials);
        }

        dbUser.ValidatePassword(request.Password);
        dbUser.ValidateStatus();
        dbUser.GenerateUserSecurityCode(SecurityCodeTypes.TwoFactorAuthentication);

        await appDbContext.SaveChangesAsync(cancellationToken);

        await SendTwoFactorCodeEmail(dbUser);

        return Unit.Value;

    }

    private Task SendTwoFactorCodeEmail(User user)
    {
        var code = user.UserSecurityCodes.First().Code;
        var expiresAt = user.UserSecurityCodes.First().ExpiresAt.ToString("dd/MM/yyyy HH:mm");
        var firstName = user.FirstName;
        var email = user.Email;

        string assemblyPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location) + "\\EmailTemplates";
        
        var template = File.ReadAllText(assemblyPath + "\\SendTwoFactorCode.html");

        template = template.Replace("{SecurityCode}", code)
            .Replace("{ExpiresAt}", expiresAt)
            .Replace("{FirstName}", firstName);

        emailService.QuickSendAsync(subject: "Hemis New Login Code", body: template, to: email);

        return Task.CompletedTask;
    }
}
