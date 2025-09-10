using GNT.Domain.Models;
using GNT.Shared.Dtos.UserManagement;
using Microsoft.EntityFrameworkCore;

namespace GNT.Application.Account.Queries;

public class UserQuery : IRequest<UserDto>
{
    public UserQuery(Guid id)
    {
        Id = id;
    }

    public Guid Id { get; set; }
}

public class UserQueryHandler : RequestHandler<UserQuery, UserDto>
{
    public UserQueryHandler(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public override async Task<UserDto> Handle(UserQuery request, CancellationToken cancellationToken)
    {
        if (request.Id == Guid.Empty)
        {
            request.Id = CurrentUser.Id;
        }

        var user = await appDbContext.User
            .Where(d=>d.Id == request.Id)
            .Select(UserMapping.DtoProjection)
            .FirstOrDefaultAsync(cancellationToken);

        return user;
    }
}
