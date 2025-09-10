using GNT.Application;
using GNT.ExceptionHandling.Middlewears;
using GNT.Infrastructure;
using GNT.Web.Server.Config;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddServerServices();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseRequestCulture();
app.UseCors("TEMPLATE_CORS_POLICY");
app.UseCustomExceptionHandler();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.SeedDatabase();
}

app.MapGet("/", context =>
{
    context.Response.Redirect("/swagger");
   
    return Task.CompletedTask;
});

app.MapControllers();

app.Run();
