namespace GNT.Application.Interfaces;

public interface IEmailService
{
    IEmailService AddRecipient(string emailAddress);

    IEmailService AddRecipients(IEnumerable<string> emailAddresses);

    IEmailService AddCCRecipient(string emailAddress);

    IEmailService AddCCRecipients(IEnumerable<string> emailAddresses);

    IEmailService AddSubject(string subject);

    IEmailService AddBody(string html);

    IEmailService AddAttachment(Stream content, string fileName, string mediaType, string mediaSubType);

    IEmailService Send();

    Task<IEmailService> QuickSendAsync(string subject, string body, string to);
}
