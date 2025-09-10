using GNT.Application.Interfaces;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using System.ComponentModel.DataAnnotations;

namespace GNT.Infrastructure.Email;

public sealed class EmailService : IHideObjectMembers, IDisposable, IEmailService
{
    private readonly IWebHostEnvironment Env;
    private readonly IEnumerable<MailboxAddress> SystemErrorRecipients;
    private readonly SmtpOptions SmtpOptions;
    private readonly ICollection<MailboxAddress> To;
    private readonly ICollection<MailboxAddress> Cc;
    private readonly ICollection<MimePart> Attachments;
    private readonly MessagePriority Priority;

    private MailboxAddress from;
    private string subject;
    private MimePart Body;

    public EmailService(IOptions<SmtpOptions> smtpOptions, IWebHostEnvironment env)
    {
        Env = env;
        SmtpOptions = smtpOptions.Value;
        SystemErrorRecipients = ParseAddresses(SmtpOptions.SystemErrorRecipients);
        from = new MailboxAddress(AssemblyName(), SmtpOptions.From);
        To = new List<MailboxAddress>();
        Cc = new List<MailboxAddress>();
        Attachments = new List<MimePart>();
        Priority = MessagePriority.Normal;
    }

    /// <summary>
    /// Creates a new Email instance and sets the from
    /// property
    /// </summary>
    public IEmailService From(bool isError = false)
    {
        if (isError)
        {
            from = new MailboxAddress($"ERROR - {SmtpOptions.From}", SmtpOptions.From);
        }
        else
        {
            from = new MailboxAddress($"{SmtpOptions.From}", SmtpOptions.From);
        }
        return this;
    }

    #region To

    /// <summary>
    /// Adds a recipient to the email
    /// </summary>
    /// <param name="emailAddress">Email address of recipient</param>
    /// <returns></returns>
    public IEmailService AddRecipient(string emailAddress)
    {
        if (ValidateEmailAddress(emailAddress))
        {
            var mailAddress = MailboxAddress.Parse(emailAddress);

            To.Add(mailAddress);
        }

        return this;
    }

    /// <summary>
    /// Adds all recipients in list to email
    /// </summary>
    /// <param name="mailAddresses">List of recipients</param>
    public IEmailService AddRecipients(IEnumerable<string> mailAddresses)
    {
        if (mailAddresses == null) return this;
        foreach (var address in mailAddresses)
        {
            AddRecipient(address);
        }

        return this;
    }

    /// <summary>
    /// Adds system recipients in list to email
    /// </summary>
    public EmailService AddSystemEmails()
    {
        foreach (var address in SystemErrorRecipients)
        {
            To.Add(address);
        }

        return this;
    }

    #endregion To

    #region CC

    /// <summary>
    /// Adds a Carbon Copy to the email
    /// </summary>
    /// <param name="emailAddress">Email address to cc</param>
    public IEmailService AddCCRecipient(string emailAddress)
    {
        if (ValidateEmailAddress(emailAddress))
        {
            var mailAddress = MailboxAddress.Parse(emailAddress);
            Cc.Add(mailAddress);
        }

        return this;
    }

    /// <summary>
    /// Adds all Carbon Copy in list to an email
    /// </summary>
    /// <param name="mailAddresses">List of recipients to CC</param>
    public IEmailService AddCCRecipients(IEnumerable<string> mailAddresses)
    {
        if (mailAddresses != null)
        {
            foreach (var address in mailAddresses)
            {
                AddCCRecipient(address);
            }
        }

        return this;
    }

    #endregion CC

    /// <summary>
    /// Sets the subject of the email. If subject contains '\n', or '\r', or any combination of them, it will remove them
    /// because they are invalid in email subject.
    /// </summary>
    /// <param name="subjectParameter">email subject</param>
    public IEmailService AddSubject(string subjectParameter)
    {
        subject = subjectParameter.Replace("\r", string.Empty).Replace("\n", string.Empty);

        subject = $"[{Env.EnvironmentName}] [{AssemblyName()}] - {subject}";
        return this;
    }

    /// <summary>
    /// Adds a Body to the Email
    /// </summary>
    /// <param name="bodyParameter">The content of the body</param>
    public IEmailService AddBody(string bodyParameter)
    {
        // var finalHtmlEmail = PreMailer.Net.PreMailer.MoveCssInline(body, true, null, null, true, true);
        Body = new TextPart(TextFormat.Html)
        {
            Text = bodyParameter
        };

        return this;
    }

    #region Attachments

    /// <summary>
    /// Adds an Attachment to the Email
    /// </summary>
    public IEmailService AddAttachment(Stream content, string fileName, string mediaType, string mediaSubType)
    {
        var contentType = new ContentType(mediaType, mediaSubType);

        var att = new MimePart(contentType)
        {
            Content = new MimeContent(content),
            ContentDisposition = new ContentDisposition(ContentDisposition.Attachment),
            ContentTransferEncoding = ContentEncoding.Base64,
            FileName = fileName
        };

        Attachments.Add(att);

        return this;
    }

    #endregion Attachments

    /// <summary>
    /// Sends email synchronously
    /// </summary>
    public IEmailService Send()
    {
        To.Clear();
        Cc.Clear();
        From(true);
        AddSystemEmails();

        using var client = new SmtpClient();
        if (Env.EnvironmentName == "Development") client.ServerCertificateValidationCallback = (s, c, h, e) => true;

        client.Connect(SmtpOptions.Host, SmtpOptions.Port, SmtpOptions.EnableSsl);

        // Note: since we don't have an OAuth2 token, disable
        // the XOAUTH2 authentication mechanism.
        client.AuthenticationMechanisms.Remove("XOAUTH2");

        client.Authenticate(SmtpOptions.UserName, SmtpOptions.Password);

        client.Send(GenerateMessage());

        client.Disconnect(true);

        return this;
    }

    /// <summary>
    /// Sends email asynchronously
    /// This is a quick send email, clears data from instance, adds needed data to instance, sends email and then clears all fields.
    /// </summary>
    public async Task<IEmailService> QuickSendAsync(string subject, string body, string to)
    {
        To.Clear();
        Cc.Clear();
        AddSubjectQuickSend(subject);
        AddBody(body);
        From();
        AddRecipient(to);

        using (var client = new SmtpClient())
        {
            if (Env.EnvironmentName == "Development") client.ServerCertificateValidationCallback = (s, c, h, e) => true;

            await client.ConnectAsync(SmtpOptions.Host, SmtpOptions.Port, SmtpOptions.EnableSsl);

            // Note: since we don't have an OAuth2 token, disable
            // the XOAUTH2 authentication mechanism.
            client.AuthenticationMechanisms.Remove("XOAUTH2");

            await client.AuthenticateAsync(SmtpOptions.UserName, SmtpOptions.Password);

            await client.SendAsync(GenerateMessage());

            await client.DisconnectAsync(true);
        }

        To.Clear();
        this.subject = string.Empty;
        Body = null;

        return this;
    }

    private IEmailService AddSubjectQuickSend(string subjectParameter)
    {
        subject = subjectParameter;
        return this;
    }

    /// <summary>
    /// Releases all resources
    /// </summary>
    public void Dispose()
    {
    }

    private static IEnumerable<MailboxAddress> ParseAddresses(string emailAddresses)
    {
        if (string.IsNullOrEmpty(emailAddresses)) return Enumerable.Empty<MailboxAddress>();

        return emailAddresses.Split(';')
            .Select(x => x.Trim())
            .Where(ValidateEmailAddress)
            .Select(MailboxAddress.Parse);
    }

    private static bool ValidateEmailAddress(string emailAddress)
    {
        return !string.IsNullOrEmpty(emailAddress) && new EmailAddressAttribute().IsValid(emailAddress);
    }

    private static string AssemblyName()
    {
        return System.Reflection.Assembly.GetEntryAssembly()?.GetName().Name;
    }

    private MimeMessage GenerateMessage()
    {
        var message = new MimeMessage();
        message.From.Add(from);
        message.To.AddRange(To);
        message.Cc.AddRange(Cc);
        message.ReplyTo.Add(from);
        message.Subject = subject;
        message.Priority = Priority;

        var multipart = new Multipart("mixed") { Body };
        foreach (var attachment in Attachments) multipart.Add(attachment);

        message.Body = multipart;

        return message;
    }
}