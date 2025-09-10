using Blazored.LocalStorage;
using GNT.Common.Client.Services;
using GNT.Shared;
using GNT.Shared.Dtos.UserManagement;
using GNT.Web.Client.Services;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.Extensions.DependencyInjection;
using MudBlazor;
using MudBlazor.Services;

namespace GNT.Common.Client
{
    public static class ServicesSetup
    {
        public static IServiceCollection AddCommonClientServices(this IServiceCollection services, string hostBaseAddress)
        {
            services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(/*hostBaseAddress*/"https://localhost:7284/") });

            services.AddTransient<DialogsService>();

            services.AddScoped<BlazorHttpClient>();

            services.AddScoped<AuthenticationStateProvider, ServerAuthenticationStateProvider>();

            services.AddScoped<CurrentUserService>();
            services.AddSingleton<CurrentUser>();

            services.AddBlazoredLocalStorage();

            services.AddMudServices();

            services.AddCommonServices();
            services.AddSharedServices();

            return services;
        }
    }
}
