using GNT.Domain.Models;
using GNT.Shared.Dtos.Roles;
using Microsoft.EntityFrameworkCore;

namespace GCSS.Administration.Application.Roles.Queries
{
    public class RoleListQuery : IRequest<IEnumerable<RoleDto>>
    {
        public RoleListQuery()
        {
        }
    }

    internal class RoleListQueryHandler : RequestHandler<RoleListQuery, IEnumerable<RoleDto>>
    {

        public RoleListQueryHandler(IPaginationService paginationService, IServiceProvider serviceProvider) : base(serviceProvider)
        {
        }

        public async override Task<IEnumerable<RoleDto>> Handle(RoleListQuery request, CancellationToken cancellationToken)
        {
            var roles = await appDbContext.Role
                .OrderBy(d => !d.IsDefaultRole)
                .ThenBy(d => d.Name)
                .Select(RoleMapping.DtoProjection)
                .ToListAsync(cancellationToken);

            return roles;
        }
    }
}
