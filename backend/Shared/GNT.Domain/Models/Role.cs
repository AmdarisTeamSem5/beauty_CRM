using GNT.Domain.BaseModels;
using GNT.Shared.Dtos.Roles;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Linq.Expressions;

namespace GNT.Domain.Models;

public class Role : BaseEntity
{
    public Role()
    {
        RolePermissions = new HashSet<RolePermission>();
        UserRoles = new HashSet<UserRole>();
    }

    public string Name { get; set; }
    public string Description { get; set; }

    public bool IsDefaultRole { get; set; }

    public virtual ICollection<RolePermission> RolePermissions { get; set; }
    public virtual ICollection<UserRole> UserRoles { get; set; }
}

public class RoleConfiguration : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> entity)
    {
        entity.ConfigureBase();
    }
}

public static class RoleMapping
{
    public static Expression<Func<Role, RoleDto>> DtoProjection
    {
        get
        {
            return d => new RoleDto
            {
                Id = d.Id,
                Name = d.Name,
                Description = d.Description,
                IsDefault = d.IsDefaultRole,
            };
        }
    }

    public static Role CreateEntity(this CreateRoleDto postModel)
    {
        return new Role
        {
            Name = postModel.Name,
            Description = postModel.Description,
        };
    }
}
