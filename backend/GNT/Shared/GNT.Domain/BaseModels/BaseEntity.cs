using GNT.Domain.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GNT.Domain.BaseModels
{
    public class BaseEntity
    {
        public Guid Id { get; set; }

    }

    public static class BaseEntityConfiguration
    {
        public static void ConfigureBase<T>(this EntityTypeBuilder<T> builder) where T : BaseEntity
        {
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id).ValueGeneratedOnAdd();
        }
    }

}
