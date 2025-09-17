using GNT.Domain.BaseModels;
using GNT.Shared.Enums;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using GNT.Shared.Dtos.Salons;



namespace GNT.Domain.Models;

public class Salon : BaseEntity
{
    public Guid OwnerId { get; set; }
    public User Owner { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Address { get; set; }
    public Region Region { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

}
public class SalonConfiguration : IEntityTypeConfiguration<Salon>
{
    public void Configure(EntityTypeBuilder<Salon> entity)
    {
        entity.ConfigureBase();
    }
}

public static class SalonMapping
{
    public static Expression<Func<Salon, SalonDto>> DtoProjection
    {
        get
        {
            return d => new SalonDto
            {
                Id = d.Id,
                OwnerId = d.OwnerId,
                Name = d.Name,
                Description = d.Description,
                Address = d.Address,
                Region = d.Region,
                Phone = d.Phone,
                Email = d.Email,
                UpdatedAt = d.UpdatedAt,
                CreatedAt = d.CreatedAt
            };
        }
    }

    public static Salon CreateEntity(this CreateSalonDto d)
    {
        return new Salon
        {
            Id = Guid.NewGuid(),
            OwnerId = d.OwnerId,
            Name = d.Name,
            Description = d.Description,
            Address = d.Address,
            Region = d.Region,
            Phone = d.Phone,
            Email = d.Email,
            CreatedAt = DateTime.UtcNow,
        };
    }
}
