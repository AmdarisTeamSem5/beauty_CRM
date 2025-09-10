using GNT.Domain.Models;
using GNT.Shared.Dtos.Roles;
using Microsoft.EntityFrameworkCore;

namespace GCSS.Administration.Application.Organizations.Queries
{
    public class RoleQuery : IRequest<RoleDto>
    {
        public RoleQuery(Guid id)
        {
            Id = id;
        }

        internal Guid Id { get; set; }
    }

    internal class RoleQueryHandler : RequestHandler<RoleQuery, RoleDto>
    {
        public RoleQueryHandler(IServiceProvider serviceProvider) : base(serviceProvider)
        {
        }

        public async override Task<RoleDto> Handle(RoleQuery request, CancellationToken cancellationToken)
        {
            var role = await appDbContext.Role.Where(d => d.Id == request.Id)
                .Select(RoleMapping.DtoProjection)
                .FirstOrDefaultAsync(cancellationToken);

            return role;
        }
    }
}
