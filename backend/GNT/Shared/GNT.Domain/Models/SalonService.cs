using GNT.Domain.BaseModels;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using GNT.Shared.Dtos.SalonServices;


namespace GNT.Domain.Models;

public class SalonService : BaseEntity
{
    public Guid SalonId { get; set; }
    public Guid SpecialistId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int DurationMinutes { get; set; }
    public int PriceMDL { get; set; }
}

public class SalonServiceConfiguration : IEntityTypeConfiguration<SalonService>
{
    public void Configure(EntityTypeBuilder<SalonService> entity)
    {
        // TODO:Adrin Define relationships between itself and other data
        entity.ConfigureBase();
    }
}
public static class SalonServiceMapping
{
    public static Expression<Func<SalonService, SalonServiceDto>> DtoProjection
    {
        get
        {
            return d => new SalonServiceDto
            {
                Id = d.Id,
                // TODO:Adrian same as bellow
                // OwnerId = d.OwnerId,
                // Name = d.Name,
                // Description = d.Description,
                // Address = d.Address,
                // Region = d.Region,
                // Phone = d.Phone,
                // Email = d.Email,
            };
        }
    }

    public static SalonService CreateEntity(this CreateSalonServiceDto d)
    {
        return new SalonService
        {
            Id = Guid.NewGuid(),
            // TODO:Adrian change this to SalonService fields
            // OwnerId = d.OwnerId,
            // Name = d.Name,
            // Description = d.Description,
            // Address = d.Address,
            // Region = d.Region,
            // Phone = d.Phone,
            // Email = d.Email,
        };
    }
}
