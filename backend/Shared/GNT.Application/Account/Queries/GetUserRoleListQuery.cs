using GNT.Domain.Models;
using GNT.Shared.Dtos.Roles;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GNT.Application.Account.Queries
{
    public class GetUserRoleListQuery : IRequest<IEnumerable<RoleDto>>
    {
        public GetUserRoleListQuery(Guid userId)
        {
            UserId = userId;
        }

        internal Guid UserId { get; set; }
    }

    internal class GetUserRoleListQueryHandler : RequestHandler<GetUserRoleListQuery, IEnumerable<RoleDto>>
    {
        public GetUserRoleListQueryHandler(IServiceProvider serviceProvider) : base(serviceProvider)
        {
        }

        public async override Task<IEnumerable<RoleDto>> Handle(GetUserRoleListQuery request, CancellationToken cancellationToken)
        {
            return await appDbContext.UserRole.Where(d => d.UserId == request.UserId)
                .Select(d => d.Role)
                .Select(RoleMapping.DtoProjection)
                .ToListAsync(cancellationToken);
        }
    }
}
