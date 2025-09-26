using GNT.Domain.Models;
using GNT.Shared.Dtos.UserManagement;
using GNT.Shared.Enums;              // PriceBand
using Microsoft.EntityFrameworkCore;

namespace GNT.Application.Account.Queries;

public sealed class GetAllUsersQuery : IRequest<List<UserDto>>
{
    public PriceBand? Band { get; init; }
    public bool ExcludeUsersWithNoServices { get; init; } = false;
    public string? OrderBy { get; init; }
    public bool Desc { get; init; } = false;

    // NEW: optional filter by salon owner
    public Guid? OwnerId { get; init; }   // <- pass the UserId here
}

internal sealed class GetAllUsersQueryHandler
    : RequestHandler<GetAllUsersQuery, List<UserDto>>
{
    public GetAllUsersQueryHandler(IServiceProvider sp) : base(sp) { }


    public override async Task<List<UserDto>> Handle(
        GetAllUsersQuery request,
        CancellationToken ct)
    {
        // Return absolutely all salons, deterministically ordered
        return await appDbContext.User
            .OrderBy(s => s.Id)
            .Select(UserMapping.DtoProjection)
            .AsNoTracking()
            .ToListAsync(ct);
    }
}
