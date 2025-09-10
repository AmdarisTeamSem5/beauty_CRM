using GNT.Application.Interfaces;
using GNT.Shared.Dtos.UserManagement;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

using ISession = GNT.Application.Interfaces.ISession;

namespace GNT.Application;

public abstract class RequestHandler<TRequest, TResponse> : Session, IRequestHandler<TRequest, TResponse> where TRequest : IRequest<TResponse>
{
    protected IAppDbContext appDbContext;

    protected RequestHandler(IServiceProvider serviceProvider) : base(serviceProvider)
    {
        appDbContext = (IAppDbContext)serviceProvider.GetService(typeof(IAppDbContext));
    }

    public abstract Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken);
}

public class Session : ISession
{
    public IHttpContextAccessor HttpContextAccessor { get; set; }
    public CurrentUser CurrentUser { get; set; }
    public string HostName { get; set; }
    public string ClientUrl { get; set; }

    private IConfiguration Configuration { get; }

    public Session(IServiceProvider serviceProvider)
    {
        Configuration = (IConfiguration)serviceProvider.GetService(typeof(IConfiguration));
        HttpContextAccessor = (IHttpContextAccessor)serviceProvider.GetService(typeof(IHttpContextAccessor));

        CurrentUser = new CurrentUser(HttpContextAccessor?.HttpContext?.User?.Claims);

        HostName = "https://" + HttpContextAccessor?.HttpContext?.Request.Host.Value;
        ClientUrl = Configuration["ClientAppUrl"];
    }
}
