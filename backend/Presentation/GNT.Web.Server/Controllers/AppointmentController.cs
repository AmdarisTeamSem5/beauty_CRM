
using GNT.Application.Appointments.Commands;
using GNT.Application.Appointments.Queries;
using GNT.Shared.Dtos.Pagination;
using GNT.Shared.Dtos.PriceBandOptions;
using GNT.Shared.Dtos.Pricing;
using GNT.Shared.Dtos.Appointments;
using GNT.Shared.Enums;
using GNT.Web.Server.Config;
using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GNT.Web.Server.Controllers;

// [Authorize]
[ApiController]
[Route("api/[controller]")]
public class AppointmentController : BaseController
{


    [HttpGet]   // GET /api/salon
    [ProducesResponseType(typeof(List<AppointmentDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<AppointmentDto>>> GetAll(CancellationToken ct)
    {
        var result = await Mediator.Send(new GetAllAppointmentsQuery(), ct);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<AppointmentDto> Get([FromRoute] Guid id)
    {
        return await Mediator.Send(new AppointmentQuery(id));
    }

    [HttpPost]
    public async Task<Guid> Create([FromBody] CreateAppointmentDto postModel)
    {
        return await Mediator.Send(new CreateAppointmentCommand(postModel));
    }

    [HttpDelete("{id}")]
    public async Task Delete([FromRoute] Guid id)
    {
        await Mediator.Send(new DeleteAppointmentCommand(id));
    }




}
