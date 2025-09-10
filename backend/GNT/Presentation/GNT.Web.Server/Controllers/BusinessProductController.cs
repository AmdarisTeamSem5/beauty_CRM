using GNT.Application.BusinessProducts.Commands;
using GNT.Application.BusinessProducts.Queries;
using GNT.Shared.Dtos.BusinessProducts;
using GNT.Shared.Dtos.Pagination;
using GNT.Web.Server.Config;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GNT.Web.Server.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class BusinessProductController : BaseController
{
    [HttpPost("get-all")]
    public async Task<PaginatedList<BusinessProductDto>> GetAll([FromBody] PageQuery queryModel)
    {
        return await Mediator.Send(new BusinessProductListQuery(queryModel));
    }

    [HttpGet("{id}")]
    public async Task<BusinessProductDto> Get([FromRoute] Guid id)
    {
        return await Mediator.Send(new BusinessProductQuery(id));
    }

    [HttpPost]
    public async Task<Guid> Create([FromBody] CreateBusinessProductDto postModel)
    {
        return await Mediator.Send(new CreateBusinessProductCommand(postModel));
    }

    [HttpPatch("{id}")]
    public async Task Edit([FromRoute] Guid id, [FromBody] EditBusinessProductDto model)
    {
        await Mediator.Send(new EditBusinessProductCommand(id, model));
    }

    [HttpDelete("{id}")]
    public async Task Delete([FromRoute] Guid id)
    {
        await Mediator.Send(new DeleteBusinessProductCommand(id));
    }
}
