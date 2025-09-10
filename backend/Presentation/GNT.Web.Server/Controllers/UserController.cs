using GNT.Application.Account.Commands;
using GNT.Application.Account.Queries;
using GNT.Shared.Dtos.Pagination;
using GNT.Shared.Dtos.Roles;
using GNT.Shared.Dtos.UserManagement;
using GNT.Web.Server.Config;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GNT.Web.Server;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserController : BaseController
{

    [HttpPost("get-all")]
    public async Task<PaginatedList<UserDto>> GetUsers([FromBody] PageQuery queryModel)
    {
        return await Mediator.Send(new UserListQuery(queryModel));
    }

    [HttpGet("{id}")]
    public async Task<UserDto> GetUser([FromRoute] Guid id)
    {
        return await Mediator.Send(new UserQuery(id));
    }

    [HttpPost]
    public async Task<Guid> CreateUser([FromBody] CreateUserDto postModel)
    {
        return await Mediator.Send(new CreateUserCommand(postModel));
    }

    [HttpPatch("{id}")]
    public async Task EditUser([FromRoute] Guid id, [FromBody] EditUserDto model)
    {
        var command = new EditUserCommand(id, model);

        await Mediator.Send(command);
    }

    [HttpGet("{id}/roles")]
    public async Task<IEnumerable<RoleDto>> GetUserRoles([FromRoute] Guid id)
    {
        return await Mediator.Send(new GetUserRoleListQuery(id));
    }

    [HttpPost("{id}/roles")]
    public async Task ManageUserRoles([FromRoute] Guid id, [FromBody] ManageUserRolesDto postModel)
    {
        await Mediator.Send(new ManageUserRolesCommand(id, postModel));
    }
}
