
using GNT.Application.Salons.Commands;
using GNT.Application.Salons.Queries;
using GNT.Shared.Dtos.Pagination;
using GNT.Shared.Dtos.PriceBandOptions;
using GNT.Shared.Dtos.Pricing;
using GNT.Shared.Dtos.Salons;
using GNT.Shared.Enums;
using GNT.Web.Server.Config;
using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GNT.Web.Server.Controllers;

// [Authorize]
[ApiController]
[Route("api/[controller]")]
public class SalonController : BaseController
{

    //
    // [HttpGet]   // GET /api/salon
    // [ProducesResponseType(typeof(List<SalonDto>), StatusCodes.Status200OK)]
    // public async Task<ActionResult<List<SalonDto>>> GetAll(CancellationToken ct)
    // {
    //     var result = await Mediator.Send(new GetAllSalonsQuery(), ct);
    //     return Ok(result);
    // }

    [HttpGet]
    [ProducesResponseType(typeof(List<SalonDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<SalonDto>>> GetAll(
        [FromQuery] string? orderBy,
        [FromQuery] Guid? ownerId,
        [FromQuery] PriceBand? band,
        CancellationToken ct,
        // optional params
        [FromQuery] bool excludeSalonsWithNoServices = false,
        [FromQuery] bool desc = false)
    {
        var query = new GetAllSalonsQuery
        {
            Band = band,
            ExcludeSalonsWithNoServices = excludeSalonsWithNoServices,
            OrderBy = orderBy,
            Desc = desc,
            OwnerId = ownerId
        };

        var result = await Mediator.Send(query, ct);
        return Ok(result);
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
