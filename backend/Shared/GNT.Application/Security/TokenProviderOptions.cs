namespace GNT.Application.Security;

public sealed class TokenProviderOptions
{
    public string Issuer { get; set; }
    public string Audience { get; set; }
    public int ExpirationSeconds { get; set; }
    public string CookieName { get; set; }
    public string ExpirationHeaderName { get; set; }
}
