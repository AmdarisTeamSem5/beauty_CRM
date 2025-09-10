using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using System.Text;
using System.Text.RegularExpressions;

namespace GNT.Infrastructure.Email;

public static class EmailTableFormat
{
    public static string CreateTable(IFormCollection info, string title)
    {
        var sb = new StringBuilder();

        sb.AppendLine("<table style=\"border: 1px solid black; border-collapse:collapse; width: 100%;\">");

        if (!string.IsNullOrWhiteSpace(title))
        {
            sb.AppendLine("<tr>");
            sb.AppendLine("<th colspan=\"2\" style=\"border: 1px solid black; text-align: center; vertical-align: middle; padding: 3px; background: #E8E8E8;\"><strong>" + title.ToUpper() + "</strong></th>");
            sb.AppendLine("</tr>");
        }

        foreach (var key in info.Keys)
        {
            var value = info[key];

            if (string.IsNullOrWhiteSpace(value))
            {
                continue;
            }

            sb.AppendLine("<tr>");

            sb.AppendLine("<td style=\"width: 180px; border: 1px solid black; text-align: center; vertical-align: middle; padding: 3px;\"><strong>" + key + "</strong></td>");
            sb.AppendLine("<td style=\"border: 1px solid black; text-align: left; vertical-align: top; padding: 3px;\"><pre style=\"font-size: 1.2em; margin: 0;\">" + value + "</pre></td>");

            sb.AppendLine("</tr>");
        }

        sb.AppendLine("</table>");
        sb.AppendLine("<br/>");
        sb.AppendLine("<br/>");

        return sb.ToString();
    }

    public static string ErrorToString(HttpContext currentRequest, Exception exception, string caughtIn)
    {
        var sb = new StringBuilder();

        var requestInfo = new Dictionary<string, StringValues>
        {
            { "Url", currentRequest.Request.Path.ToString() },
            { "Type", currentRequest.Request.Method },
            { "Agent", string.Empty },
            { "Host Address/Name", currentRequest.Request.HttpContext.Connection.RemoteIpAddress + "/" + currentRequest.Request.HttpContext.Connection.RemotePort },
            { "Application User", currentRequest.Request.HttpContext.User.Identity?.Name },
            { "User Agent", currentRequest.Request.Headers["User-Agent"] },
            { "Crawler", Regex.IsMatch(currentRequest.Request.Headers["User-Agent"], @"bot|crawler|baiduspider|80legs|ia_archiver|voyager|curl|wget|yahoo! slurp|mediapartners-google", RegexOptions.IgnoreCase) ? "Yes" : "No" }
        };
        sb.Append(CreateTable(new FormCollection(requestInfo), "Request Data"));

        var bodyInfo = new Dictionary<string, StringValues>
        {
            { "QueryString", currentRequest.Request.QueryString.ToString() }
        };
        sb.Append(CreateTable(new FormCollection(bodyInfo), "Body Data"));

        var exceptionInfo = new Dictionary<string, StringValues>
        {
            { "Caught In", caughtIn },
            { "Message", exception.Message },
            { "Stack Trace", exception.StackTrace },
            { "Inner Exception", exception.InnerException?.ToString() }
        };

        sb.Append(CreateTable(new FormCollection(exceptionInfo), "Exception Data"));

        return sb.ToString();
    }
}
