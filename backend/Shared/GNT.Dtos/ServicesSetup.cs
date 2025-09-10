using GNT.Shared.Translate;
using Microsoft.Extensions.DependencyInjection;

namespace GNT.Shared
{
    public static class ServicesSetup
    {
        public static IServiceCollection AddSharedServices(this IServiceCollection services)
        {
            services.AddLocalization();
            services.AddSingleton<TranslateService>();

            return services;
        }
    }
}
