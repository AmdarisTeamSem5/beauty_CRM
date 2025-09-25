
using GNT.Application.Specialists.Commands;
using GNT.Application.Specialists.Queries;
using GNT.Shared.Dtos.Pagination;
using GNT.Shared.Dtos.Specialists;
// using GNT.Shared.Enums;
using GNT.Web.Server.Config;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GNT.Web.Server.Controllers;

// [Authorize]
[ApiController]
[Route("api/[controller]")]
public class SpecialistController : BaseController
{


    [HttpGet]   // GET /api/specialist
    [ProducesResponseType(typeof(List<SpecialistDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<SpecialistDto>>> GetAll(CancellationToken ct)
    {
        var result = await Mediator.Send(new GetAllSpecialistsQuery(), ct);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<SpecialistDto> Get([FromRoute] Guid id)
    {
        return await Mediator.Send(new SpecialistQuery(id));
    }

    [HttpPost]
    public async Task<Guid> Create([FromBody] CreateSpecialistDto postModel)
    {
        return await Mediator.Send(new CreateSpecialistCommand(postModel));
    }

    // [HttpPatch("{id}")]
    // public async Task Edit([FromRoute] Guid id, [FromBody] EditSpecialistDto model)
    // {
    //     await Mediator.Send(new EditSpecialistCommand(id, model));
    // }

    [HttpDelete("{id}")]
    public async Task Delete([FromRoute] Guid id)
    {
        await Mediator.Send(new DeleteSpecialistCommand(id));
    }

}
