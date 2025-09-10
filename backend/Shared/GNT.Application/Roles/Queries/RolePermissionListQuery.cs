using GNT.Dtos.Enums;
using Microsoft.EntityFrameworkCore;

namespace GCSS.Administration.Application.Roles.Queries
{
    public class RolePermissionListQuery : IRequest<List<Permission>>
    {
        public RolePermissionListQuery(Guid roleId)
        {
            RoleId = roleId;
        }

        internal Guid RoleId { get; set; }
    }

    internal class RolePermissionListQueryHandler : RequestHandler<RolePermissionListQuery, List<Permission>>
    {
        public RolePermissionListQueryHandler(IServiceProvider serviceProvider) : base(serviceProvider)
        {
        }

        public async override Task<List<Permission>> Handle(RolePermissionListQuery request, CancellationToken cancellationToken)
        {
            var permissions = await appDbContext.RolePermission
                .Where(d => d.RoleId == request.RoleId)
                .Select(d => d.PermissionId)
                .ToListAsync(cancellationToken);

            return permissions;
        }
    }
}
