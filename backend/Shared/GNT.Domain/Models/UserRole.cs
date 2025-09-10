using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GNT.Domain.Models;

public class UserRole
{
    public Guid UserId { get; set; }
    public Guid RoleId { get; set; }

    public virtual User User { get; set; }
    public virtual Role Role { get; set; }
}

public class UserRoleConfiguration : IEntityTypeConfiguration<UserRole>
{
    public void Configure(EntityTypeBuilder<UserRole> entity)
    {
        entity.HasKey(d => new { d.RoleId, d.UserId });

        entity.HasOne(d => d.User)
            .WithMany(d => d.UserRoles)
            .HasForeignKey(d => d.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        entity.HasOne(d => d.Role)
            .WithMany(d => d.UserRoles)
            .HasForeignKey(d => d.RoleId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
