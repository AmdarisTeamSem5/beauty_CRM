using System.Reflection;
using System.Web;
using GNT.Application.Account.Utils;
using GNT.Application.Interfaces;
using GNT.Common.Extensions;
using GNT.Domain.Models;
using GNT.Dtos.Enums;

namespace GNT.Application.Account.Commands;

public class ResetPasswordRequestCommand : IRequest<Unit>
{
    public ResetPasswordRequestCommand(string email)
    {
        Email = email;
    }

    public string Email { get; set; }
}

public class ResetPasswordRequestCommandHandler : RequestHandler<ResetPasswordRequestCommand, Unit>
{
    private readonly IEmailService EmailService;

    public ResetPasswordRequestCommandHandler(IServiceProvider serviceProvider, IEmailService emailService) : base(serviceProvider)
    {
        EmailService = emailService;
    }

    public override async Task<Unit> Handle(ResetPasswordRequestCommand request, CancellationToken cancellationToken)
    {
        var user = appDbContext.User.FirstOrDefault(d => d.Email == request.Email);

        if (user == null)
        {
            return Unit.Value;
        }

        user.ValidateStatus();
        user.GenerateUserSecurityCode(SecurityCodeTypes.ResetPassword);

        await appDbContext.SaveChangesAsync(cancellationToken);

        SendResetPasswordEmail(user.Email, user.FirstName, user.UserSecurityCodes.First().Code, user.UserSecurityCodes.First().ExpiresAt);

        return Unit.Value;
    }

    private void SendResetPasswordEmail(string email, string firstName, string securityCode, DateTime expiresAt)
    {
        var encodedEmail = HttpUtility.UrlEncode(email);

        string assemblyPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location) + "\\EmailTemplates";
        var template = File.ReadAllText(assemblyPath + "\\ResetPassword.html");

        template = template.Replace("{BaseUrl}", ClientUrl)
            .Replace("{EmailAddress}", encodedEmail)
            .Replace("{ExpiresAt}", expiresAt.ToString("dd.MM.yyyy HH:mm"))
            .Replace("{SecurityCode}", securityCode)
            .Replace("{FirstName}", firstName);

        EmailService.QuickSendAsync(subject: "Reset Your Password", body: template, to: email);
    }
}