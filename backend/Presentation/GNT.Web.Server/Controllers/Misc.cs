using GNT.Shared.Enums;
using GNT.Web.Server.Config;
using Microsoft.AspNetCore.Mvc;

namespace GNT.Web.Server.Controllers;

    // [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class MiscController : BaseController
    {
    [HttpGet("ServiceTypes")]
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

