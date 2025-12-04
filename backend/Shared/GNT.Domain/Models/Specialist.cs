using GNT.Domain.BaseModels;
using GNT.Shared.Enums;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using GNT.Shared.Dtos.Specialists;



namespace GNT.Domain.Models;

public class Specialist : BaseEntity
{
    public Guid SalonId { get; set; }
    public string FullName { get; set; }
    public string Description { get; set; }
    public string ImageString64 { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}



public class SpecialistConfiguration : IEntityTypeConfiguration<Specialist>
{
    public void Configure(EntityTypeBuilder<Specialist> entity)
    {
        entity.ConfigureBase();
    }
}

public static class SpecialistMapping
{
    public static Expression<Func<Specialist, SpecialistDto>> DtoProjection
    {
        get
        {
            return d => new SpecialistDto
            {
                Id = d.Id,
                SalonId = d.SalonId,
                FullName = d.FullName,
                Description = d.Description,
                ImageString64 = d.ImageString64,
            };
        }
    }

    public static Specialist CreateEntity(this CreateSpecialistDto d)
    {
        return new Specialist
        {
            Id = Guid.NewGuid(),
            SalonId = d.SalonId,
            FullName = d.FullName,
            Description = d.Description,
            ImageString64 = d.ImageString64,
            CreatedAt = DateTime.UtcNow,
        };
    }
}
