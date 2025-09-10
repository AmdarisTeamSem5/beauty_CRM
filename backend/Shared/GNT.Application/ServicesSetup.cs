using GNT.Application.Account.Commands;
using GNT.Application.Account.Utils;
using GNT.Application.Infrastructure;
using GNT.Application.Security;
using GNT.Dtos.Enums;
using GNT.Shared;
using MediatR.Pipeline;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Security.Claims;

namespace GNT.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSharedServices();

            services.AddCors(
                o => o.AddPolicy("TEMPLATE_CORS_POLICY",
                b => b.AllowAnyOrigin()
                       .AllowAnyHeader()
                       .AllowAnyMethod()));

            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestPreProcessorBehavior<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestValidationBehavior<,>));

            services.AddTransient<IPaginationService, PaginationService>();
            services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();

            services.AddScoped<Interfaces.ISession, Session>();


            services.AddValidatorsFromAssemblyContaining<CreateUserCommandValidator>();
            services.AddMediatR(o => o.RegisterServicesFromAssemblies(typeof(LoginCommand).Assembly));
 
            services.AddJwt(configuration);

            return services;
        }

        public static void AddJwt(this IServiceCollection services, IConfiguration configuration)
        {
            var tokenOptions = new TokenProviderOptions();
            configuration.GetSection("TokenProvider").Bind(tokenOptions);

            services.Configure<TokenProviderOptions>(configuration.GetSection("TokenProvider"));

            services.AddScoped<JwtService>();

            services.AddAuthorizationCore(options =>
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
            })
                .AddAuthentication(o =>
                {
                    o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(o =>
                {
                    o.RequireHttpsMetadata = false;
                    o.SaveToken = true;
                    o.TokenValidationParameters = new TokenValidationParameters
                    {
                        NameClaimType = ClaimTypes.Email,
                        RoleClaimType = ClaimTypes.Role,

                        ValidateIssuer = true,
                        ValidIssuer = tokenOptions.Issuer,

                        ValidateAudience = true,
                        ValidAudience = tokenOptions.Audience,

                        ValidateIssuerSigningKey = true,
                        IssuerSigningKeyResolver = (_, st, kid, vp) =>
                        {
                            var claims = ((JsonWebToken)st).Claims;

                            var userName = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email);

                            return userName == null ? Array.Empty<SymmetricSecurityKey>() : [AuthHelper.GetUserKey(userName.Value)];
                        },

                        ValidateLifetime = true,
                        LifetimeValidator = (DateTime? notBefore, DateTime? expires, SecurityToken securityToken, TokenValidationParameters validationParameters) =>
                        {
                            return notBefore <= DateTime.UtcNow && expires >= DateTime.UtcNow;
                        },
                        AuthenticationType = JwtBearerDefaults.AuthenticationScheme
                    };

                    o.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            context.Token = context.Request.Cookies[tokenOptions.CookieName] ??
                                (string)context.Request.HttpContext.Items[tokenOptions.CookieName];

                            if (string.IsNullOrEmpty(context.Token))
                            {
                                context.Request.Headers.TryGetValue("Authorization", out var bearerToken);
                                context.Token = bearerToken.ToString().Replace("bearer ", "");
                            }

                            return Task.CompletedTask;
                        }
                    };
                });
        }
    }
}
