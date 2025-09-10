using GCSS.Administration.Application.Organizations.Queries;
using GCSS.Administration.Application.Roles.Commands;
using GCSS.Administration.Application.Roles.Queries;
using GNT.Web.Server.Config;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GNT.Dtos.Enums;
using GNT.Shared.Dtos.Roles;

namespace GNT.Web.Server.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    public class RoleController : BaseController
    {
        [HttpGet]
        [Authorize(Policy = nameof(Permission.ViewRoles))]
        public async Task<IEnumerable<RoleDto>> GetAllRoles()
        {
            var query = new RoleListQuery();

            return await Mediator.Send(query);
        }

        [HttpGet("{id}")]
        [Authorize(Policy = nameof(Permission.ViewRoles))]
        public async Task<RoleDto> GetRole([FromRoute] Guid id)
        {
            return await Mediator.Send(new RoleQuery(id));
        }

        [HttpPost]
        [Authorize(Policy = nameof(Permission.ManageRoles))]
        public async Task<Guid> CreateRole([FromBody] CreateRoleDto model)
        {
            return await Mediator.Send(new CreateRoleCommand(model));
        }

        [HttpPatch("{id}")]
        [Authorize(Policy = nameof(Permission.ManageRoles))]
        public async Task EditRole([FromRoute] Guid id, [FromBody] EditRoleDto model)
        {
            await Mediator.Send(new EditRoleCommand(id, model));
        }

        [HttpGet("{id}/permissionss")]
        [Authorize(Policy = nameof(Permission.ViewRoles))]
        public async Task<List<Permission>> GetRolePermissions([FromRoute] Guid id)
        {
            return await Mediator.Send(new RolePermissionListQuery(id));
        }

        [HttpPost("{id}/permissions")]
        [Authorize(Policy = nameof(Permission.ManageRoles))]
        public async Task ManageRolePermissions([FromRoute] Guid id, [FromBody] ManageRolePermissionsDto postModel)
        {
            await Mediator.Send(new ManageRolePermissionsCommand(id, postModel.PermissionsToAdd, postModel.PermissionsToRemove));
        }

        [HttpDelete("{id}")]
        public async Task DeleteRole([FromRoute] Guid id)
        {
            await Mediator.Send(new DeleteRoleCommand(id));
        }
    }
}
