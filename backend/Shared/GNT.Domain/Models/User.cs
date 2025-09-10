using GNT.Domain.BaseModels;
using GNT.Shared.Dtos.UserManagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Linq.Expressions;

namespace GNT.Domain.Models;

public class User : BaseEntity
{
    public User()
    {
        UserSecurityCodes = new HashSet<UserSecurityCode>();
    }

    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public string Password { get; set; }

    public bool IsBlocked { get; set; }
    public DateTime? UnblockDate { get; set; }


    public virtual ICollection<UserSecurityCode> UserSecurityCodes { get; set; }
    public virtual ICollection<UserRole> UserRoles { get; set; }
}

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> entity)
    {
        entity.ConfigureBase();
    }
}

public static class UserMapping
{
    public static Expression<Func<User, UserDto>> DtoProjection
    {
        get
        {
            return d => new UserDto
            {
                Id = d.Id,
                Email = d.Email,
                FirstName = d.FirstName,
                LastName = d.LastName,
                IsBlocked = d.IsBlocked,
            };
        }
    }

    public static User CreateEntity(this CreateUserDto postModel)
    {
        return new User
        {
            Id = Guid.NewGuid(),
            Email = postModel.Email,
            FirstName = postModel.FirstName,
            LastName = postModel.LastName,
            IsBlocked = postModel.IsBlocked
        };
    }
}