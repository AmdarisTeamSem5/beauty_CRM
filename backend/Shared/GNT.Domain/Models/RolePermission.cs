using GNT.Dtos.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GNT.Domain.Models;

public class RolePermission
{
    public Guid RoleId { get; set; }
    public Permission PermissionId { get; set; }

    public virtual Role Role { get; set; }
}

public class RolePermissionConfiguration : IEntityTypeConfiguration<RolePermission>
{
    public void Configure(EntityTypeBuilder<RolePermission> entity)
    {
        entity.HasKey(d => new { d.RoleId, PermissionId = (int)d.PermissionId });

        entity.HasOne(d => d.Role)
            .WithMany(d => d.RolePermissions)
            .HasForeignKey(d => d.RoleId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
