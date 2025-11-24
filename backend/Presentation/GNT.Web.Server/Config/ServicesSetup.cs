using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;

namespace GNT.Web.Server.Config
{
    public static class ServicesSetup
    {
        public static void AddServerServices(this IServiceCollection services)
        {
            services.AddControllers();
            services.AddOpenApi();

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;

            });

            services.AddCors(
                o => o.AddPolicy("TEMPLATE_CORS_POLICY",
                b => b.WithOrigins("http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000")
                       .AllowAnyHeader()
                       .AllowAnyMethod()
                       .AllowCredentials())); // Required when using credentials: "include"

            services.AddMemoryCache();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Template API",
                    Version = "v1"
                });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\"",
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }

                });
            });
        }
    }
}
