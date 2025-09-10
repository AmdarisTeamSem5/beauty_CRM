using GNT.Domain.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GNT.Domain.BaseModels
{
    public class BaseEntity
    {
        public Guid Id { get; set; }

        public Guid? CreatedById { get; set; }
        public Guid? LastUpdatedById { get; set; }


        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdatedAt { get; set; }

        public virtual User CreatedBy { get; set; }
        public virtual User LastUpdatedBy { get; set; }
    }

    public static class BaseEntityConfiguration
    {
        public static void ConfigureBase<T>(this EntityTypeBuilder<T> builder) where T : BaseEntity
        {
            builder.HasKey(e => e.Id);

            builder.HasOne(d => d.CreatedBy)
                .WithMany()
                .HasForeignKey(d => d.CreatedById);

            builder.HasOne(d => d.LastUpdatedBy)
                .WithMany()
                .HasForeignKey(d => d.LastUpdatedById);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(e => e.CreatedAt)
                .IsRequired();

            builder.Property(e => e.LastUpdatedAt)
                .IsRequired();
        }
    }
}
