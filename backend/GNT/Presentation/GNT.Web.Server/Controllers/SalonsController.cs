
using GNT.Application.Salons.Commands;
using GNT.Application.Salons.Queries;
using GNT.Shared.Dtos.Salons;
using GNT.Shared.Dtos.Pagination;
using GNT.Web.Server.Config;
// using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GNT.Web.Server.Controllers;

// [Authorize]
[ApiController]
[Route("api/[controller]")]
public class SalonController : BaseController
{
    [HttpPost("get-all")]
    public async Task<PaginatedList<SalonDto>> GetAll([FromBody] PageQuery queryModel)
    {
        // TODO:Modify SalonListQuery to account for ServiceType
        //
        var serviceTypes = queryModel.Filters?.FirstOrDefault(f => f.PropertyName == "ServiceTypes")?.Value;
        return await Mediator.Send(new SalonListQuery(queryModel, serviceTypes));
    }

    [HttpGet("{id}")]
    public async Task<SalonDto> Get([FromRoute] Guid id)
    {
        return await Mediator.Send(new SalonQuery(id));
    }

    [HttpPost]
    public async Task<Guid> Create([FromBody] CreateSalonDto postModel)
    {
        return await Mediator.Send(new CreateSalonCommand(postModel));
    }

    [HttpPatch("{id}")]
    public async Task Edit([FromRoute] Guid id, [FromBody] EditSalonDto model)
    {
        await Mediator.Send(new EditSalonCommand(id, model));
    }

    [HttpDelete("{id}")]
    public async Task Delete([FromRoute] Guid id)
    {
        await Mediator.Send(new DeleteSalonCommand(id));
    }

}
