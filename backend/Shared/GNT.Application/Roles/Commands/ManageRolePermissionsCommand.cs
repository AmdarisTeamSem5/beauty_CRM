using GNT.Domain.Models;
using GNT.Dtos.Enums;
using Microsoft.EntityFrameworkCore;

namespace GCSS.Administration.Application.Roles.Commands
{
    public class ManageRolePermissionsCommand : IRequest<Unit>
    {
        public ManageRolePermissionsCommand(Guid roleId, IEnumerable<Permission> permissionsToAdd, IEnumerable<Permission> permissionsToRemove)
        {
            RoleId = roleId;
            PermissionsToAdd = permissionsToAdd ?? Enumerable.Empty<Permission>();
            PermissionsToRemove = permissionsToRemove ?? Enumerable.Empty<Permission>();
        }

        internal Guid RoleId { get; set; }
        internal IEnumerable<Permission> PermissionsToAdd { get; set; }
        internal IEnumerable<Permission> PermissionsToRemove { get; set; }
    }

    internal class ManageRolePermissionsCommandHandler : RequestHandler<ManageRolePermissionsCommand, Unit>
    {
        public ManageRolePermissionsCommandHandler(IServiceProvider serviceProvider) : base(serviceProvider)
        {
        }

        public async override Task<Unit> Handle(ManageRolePermissionsCommand request, CancellationToken cancellationToken)
        {
            var permissionsToAdd = request.PermissionsToAdd.Distinct()
                .Select(d => new RolePermission()
                {
                    RoleId = request.RoleId,
                    PermissionId = d
                });

            var permissionsToRemove = appDbContext.RolePermission
                .Where(d => d.RoleId == request.RoleId && request.PermissionsToRemove.Contains(d.PermissionId));

            appDbContext.RolePermission.AddRange(permissionsToAdd);
            appDbContext.RolePermission.RemoveRange(permissionsToRemove);

            await appDbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
