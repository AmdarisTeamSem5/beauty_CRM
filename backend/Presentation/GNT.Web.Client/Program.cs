using GNT.Common.Client;
using GNT.Common.Client.Services;
using GNT.Dtos.Enums;
using GNT.Web.Client;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Newtonsoft.Json;
using System.Security.Claims;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddAuthorizationCore(options =>
{
    var permissions = Enum.GetValues(typeof(Permission)).Cast<Permission>();

    foreach (var permission in permissions)
    {
        options.AddPolicy(permission.ToString(), policy => policy.RequireAssertion(context =>
        {
            if (!context.User.HasClaim(c => c.Type == ClaimTypes.AuthorizationDecision))
            {
                return false;
            }

            var userPermissions = JsonConvert.DeserializeObject<IEnumerable<Permission>>(context.User.FindFirst(x => x.Type == ClaimTypes.AuthorizationDecision).Value);

            var hasPermission = userPermissions.Any(x => x == permission);

            return hasPermission;
        }));
    }
});

builder.Services.AddCommonClientServices(builder.HostEnvironment.BaseAddress);

var host = builder.Build();

await host.SetDefaultCulture();

await host.RunAsync();
