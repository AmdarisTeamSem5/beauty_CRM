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
    //rating fields
    public decimal Rating { get; private set; }     //avg rating  
    public int RatingCount { get; private set; }

    public void ApplyRating(int stars) //calculul pentru rating
    {
        if (stars < 1 || stars > 5)
            throw new ArgumentOutOfRangeException(nameof(stars), "Stars must be 1..5");

        var total = Rating * RatingCount;     
        RatingCount++;
        Rating = Math.Round((total + stars) / RatingCount, 2); 
        UpdatedAt = DateTime.UtcNow;
    }

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
                CreatedAt = d.CreatedAt,
                Rating = d.Rating,
                RatingCount = d.RatingCount
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
            CreatedAt = DateTime.UtcNow
        };
    }
}
