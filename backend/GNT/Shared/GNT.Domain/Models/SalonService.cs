using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using GNT.Domain.BaseModels;

namespace GNT.Domain.Models;

public class SalonService : BaseEntity
{
    public string Name { get; set; }
}

public class SalonServiceConfiguration : IEntityTypeConfiguration<SalonService>
{
    public void Configure(EntityTypeBuilder<SalonService> entity)
    {
        // entity.HasKey(d => new { d.RoleId, PermissionId = (int)d.PermissionId });
        //
        // entity.HasOne(d => d.Role)
        //    .WithMany(d => d.SalonServices)
        //    .HasForeignKey(d => d.RoleId)
        //    .OnDelete(DeleteBehavior.Cascade);
    }
}
