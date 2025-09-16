
using GNT.Application.SalonServices.Commands;
using GNT.Application.SalonServices.Queries;
using GNT.Shared.Dtos.SalonServices;
using GNT.Shared.Dtos.Pagination;
using GNT.Shared.Enums;
using GNT.Web.Server.Config;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GNT.Web.Server.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class SalonServiceController : BaseController
{
    [HttpPost("get-all")]
    public async Task<PaginatedList<SalonServiceDto>> GetAll([FromBody] PageQuery queryModel)
    {
        return await Mediator.Send(new SalonServiceListQuery(queryModel));
    }

    [HttpGet("{id}")]
    public async Task<SalonServiceDto> Get([FromRoute] Guid id)
    {
        return await Mediator.Send(new SalonServiceQuery(id));
    }

    [HttpPost]
    public async Task<Guid> Create([FromBody] CreateSalonServiceDto postModel)
    {
        return await Mediator.Send(new CreateSalonServiceCommand(postModel));
    }

    [HttpPatch("{id}")]
    public async Task Edit([FromRoute] Guid id, [FromBody] EditSalonServiceDto model)
    {
        await Mediator.Send(new EditSalonServiceCommand(id, model));
    }

    [HttpDelete("{id}")]
    public async Task Delete([FromRoute] Guid id)
    {
        await Mediator.Send(new DeleteSalonServiceCommand(id));
    }

    // Endpoint for requesting the salon service types
    [HttpGet("Types")]
    [AllowAnonymous] // Optional: Remove if authentication is required
    public IActionResult GetSalonServiceTypes()
    {
        var serviceTypes = Enum.GetValues(typeof(SalonServiceType))
            .Cast<SalonServiceType>()
            .Select(t => new
            {
                Id = (int)t,
                Name = t.ToString(),
            })
            .ToList();

        return Ok(serviceTypes);
    }

}
