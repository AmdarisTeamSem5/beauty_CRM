using MimeKit;
using System;
using System.ComponentModel;
using System.IO;

namespace GNT.Infrastructure.Email
{
    public sealed class EmailAttachment
    {
        public Stream EmailContent { get; set; }
        public string FileName { get; set; }
        public ContentType ContentType { get; set; }
    }


    [EditorBrowsable(EditorBrowsableState.Never)]
    public interface IHideObjectMembers
    {
        [EditorBrowsable(EditorBrowsableState.Never)]
        Type GetType();
        
         [EditorBrowsable(EditorBrowsableState.Never)]
        int GetHashCode();
        
        [EditorBrowsable(EditorBrowsableState.Never)]
        string ToString();
 
        [EditorBrowsable(EditorBrowsableState.Never)]
        bool Equals(object obj);
    }

    public sealed class SmtpOptions
    {
        public string From { get; set; }
        public bool EnableSsl { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool RequiresAuthentication { get; set; }
        public bool UseDefaultCredentials { get; set; }
        public string SystemErrorRecipients { get; set; }
    }
}
