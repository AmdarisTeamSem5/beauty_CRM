using GNT.Domain.Models;
using GNT.Shared.Dtos.UserManagement;
using Microsoft.EntityFrameworkCore;

namespace GNT.Application.Account.Commands;

public class ManageUserRolesCommand : IRequest<Unit>
{
    public ManageUserRolesCommand(Guid userId, ManageUserRolesDto postModel)
    {
        UserId = userId;
        PostModel = postModel;
    }

    internal Guid UserId { get; set; }
    internal ManageUserRolesDto PostModel { get; set; }
}

internal class ManageUserRolesCommandHandler : RequestHandler<ManageUserRolesCommand, Unit>
{
    public ManageUserRolesCommandHandler(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public async override Task<Unit> Handle(ManageUserRolesCommand request, CancellationToken cancellationToken)
    {
        var userRolesToAdd = request.PostModel.RolesToAdd
            .Select(d => new UserRole()
            { 
                UserId = request.UserId,
                RoleId = d
            });

        var userRolesToRemove = appDbContext.UserRole
                .Where(d => d.UserId == request.UserId && request.PostModel.RolesToRemove.Contains(d.RoleId));

        appDbContext.UserRole.AddRange(userRolesToAdd);
        appDbContext.UserRole.RemoveRange(userRolesToRemove);

        await appDbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}