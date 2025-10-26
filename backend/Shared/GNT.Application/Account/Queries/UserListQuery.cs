using GNT.Domain.Models;
using GNT.Shared.Dtos.Pagination;
using GNT.Shared.Dtos.UserManagement;

namespace GNT.Application.Account.Queries;

public class UserListQuery : IRequest<PaginatedList<UserDto>>
{
    public UserListQuery(PageQuery model)
    {
        QueryModel = model;
    }

    public PageQuery QueryModel { get; set; }
}

public class UserListQueryHandler : RequestHandler<UserListQuery, PaginatedList<UserDto>>
{
    private readonly IPaginationService paginationService;

    public UserListQueryHandler(IServiceProvider serviceProvider, IPaginationService paginationService) : base(serviceProvider)
    {
        this.paginationService = paginationService;
    }

    public override async Task<PaginatedList<UserDto>> Handle(UserListQuery request, CancellationToken cancellationToken)
    {
        var paginatedResult = await paginationService.PaginatedResults(appDbContext.User.AsQueryable(), request.QueryModel, UserMapping.DtoProjection);

        return paginatedResult;
    }
}

public class UserListQueryValidator : AbstractValidator<UserListQuery>
{
    public UserListQueryValidator() 
    {
    }
}

