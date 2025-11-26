using GNT.Application.Interfaces;
using GNT.Infrastructure.Context;
using GNT.Infrastructure.Email;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GNT.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, ConfigurationManager Configuration)
        {
            services.AddDbContext<IAppDbContext, AppDbContext>(o => 
            {
                o.UseSqlServer(Configuration.GetConnectionString("Default"),
                    b => b.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName));
                
                // Suppress the warning about multiple collection includes
                // Query splitting can be configured per-query using .AsSplitQuery() if needed
                o.ConfigureWarnings(warnings => 
                    warnings.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.MultipleCollectionIncludeWarning));
            });

            services.Configure<SmtpOptions>(Configuration.GetSection("Smtp"));

            services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();
           // services.AddTransient<IEmailService, EmailService>();

            return services;
        }
    }
}
