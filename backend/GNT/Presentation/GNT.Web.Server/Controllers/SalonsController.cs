
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
    [HttpPost("get-all")]
    public async Task<PaginatedList<SalonDto>> GetAll([FromBody] PageQuery queryModel)
    {

        return await Mediator.Send(new SalonListQuery(queryModel));
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

    [HttpGet("by-price")]
    [ProducesResponseType(typeof(List<SalonPriceSummaryDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<SalonPriceSummaryDto>>> GetByPrice(
         [FromQuery] PriceBandOptionDto options,
         CancellationToken ct)
    {
        var result = await Mediator.Send(new FilterSalonsByPriceQuery(options), ct);
        return Ok(result);
    }



}
