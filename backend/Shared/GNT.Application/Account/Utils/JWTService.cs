using GNT.Application.Security;
using GNT.Domain.Models;
using GNT.Shared.Dtos.UserManagement;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace GNT.Application.Account.Utils;

public class JwtService
{
    private readonly TokenProviderOptions tokenOptions;

    public JwtService(IOptions<TokenProviderOptions> tokenOptions)
    {
        this.tokenOptions = tokenOptions.Value;
    }

    public TokenDto GenerateToken(User user)
    {
        var permissions = user.UserRoles
            .SelectMany(d => d.Role.RolePermissions.Select(d => d.PermissionId))
            .AsEnumerable();

        var roles = user.UserRoles.Select(d=>d.Role.Name)
            .AsEnumerable();

        var claims = new List<Claim>()
        {
            new (ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
            new (ClaimTypes.NameIdentifier, user.Id.ToString()),
            new (ClaimTypes.Email, user.Email),
            new (ClaimTypes.AuthorizationDecision, JsonConvert.SerializeObject(permissions)),
            new (ClaimTypes.Role, JsonConvert.SerializeObject(permissions))
        };

        

        var userName = claims.FirstOrDefault(q => q.Type == ClaimTypes.Email).Value;

        var jwt = new TokenDto();

        var securityKey = AuthHelper.GetUserKey(userName);

        var jwtToken = new JwtSecurityToken(
            claims: claims,
            issuer: tokenOptions.Issuer,
            audience: tokenOptions.Audience,
            expires: DateTime.UtcNow.AddSeconds(tokenOptions.ExpirationSeconds),
            notBefore: DateTime.UtcNow,
            signingCredentials: new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256));

        jwt.Value = new JwtSecurityTokenHandler().WriteToken(jwtToken);

        return jwt;
    }
}
