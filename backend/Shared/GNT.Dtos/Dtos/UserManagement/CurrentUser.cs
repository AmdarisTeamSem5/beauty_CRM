using GNT.Dtos.Enums;
using Newtonsoft.Json;
using System.Security.Claims;

namespace GNT.Shared.Dtos.UserManagement;

public class CurrentUser
{
    public CurrentUser(IEnumerable<Claim> claims)
    {
        MapUser(this, claims);
    }

    public bool IsAuthenticated { get; set; }
    public Guid Id { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public IEnumerable<string> Roles { get; set; }
    public IEnumerable<Permission> Permissions { get; set; }

    public static void MapUser(CurrentUser currentUser, IEnumerable<Claim> claims)
    {
        if (claims != null && claims.Any())
        {
            var fullNameClaim = claims.FirstOrDefault(d => d.Type == ClaimTypes.Name)?.Value;
            var roles = claims.FirstOrDefault(d => d.Type == ClaimTypes.Role);
            var permissions = claims.FirstOrDefault(d => d.Type == ClaimTypes.AuthorizationDecision);
            var idClaim = claims.FirstOrDefault(d => d.Type == ClaimTypes.NameIdentifier)?.Value;
            var emailClaim = claims.FirstOrDefault(d => d.Type == ClaimTypes.Email)?.Value;

            currentUser.IsAuthenticated = true;
            currentUser.FullName = fullNameClaim;
            currentUser.Roles = JsonConvert.DeserializeObject<IEnumerable<string>>(roles.Value);
            currentUser.Id = Guid.Parse(idClaim);
            currentUser.Email = emailClaim;
            currentUser.Permissions = JsonConvert.DeserializeObject<IEnumerable<Permission>>(permissions.Value);
        }
        else
        {
            currentUser.IsAuthenticated = false;
            currentUser.FullName = null;
            currentUser.Id = Guid.Empty;
            currentUser.Email = null;
            currentUser.Permissions = new List<Permission>();
            currentUser.Roles = new List<string>();
        }
    }
}
