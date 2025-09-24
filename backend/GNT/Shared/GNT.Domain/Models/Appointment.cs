using GNT.Domain.BaseModels;
// using GNT.Shared.Enums;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
// using System.Linq.Expressions;
// using GNT.Shared.Dtos.Appoints;



namespace GNT.Domain.Models;

public class Appoint : BaseEntity
{
    public Guid OwnerId { get; set; } // the user who made the appointment
    public User Owner { get; set; }
    public Guid SalonServiceId { get; set; } // the service for the appointment 
    // public Guid Salon { get; set; } SalonService also contains the information about the salon so it doesn't need to be stored
    public DateTime Time { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}



public class AppointConfiguration : IEntityTypeConfiguration<Appoint>
{
    public void Configure(EntityTypeBuilder<Appoint> entity)
    {
        entity.ConfigureBase();
    }
}

public static class AppointMapping
{
    // public static Expression<Func<Appoint, AppointDto>> DtoProjection
    // {
    //     get
    //     {
    //         return d => new AppointDto
    //         {
    //             Id = d.Id,
    //             OwnerId = d.OwnerId,
    //             Name = d.Name,
    //             Rating = d.Rating,
    //             Description = d.Description,
    //             Address = d.Address,
    //             Region = d.Region,
    //             Phone = d.Phone,
    //             Email = d.Email,
    //             UpdatedAt = d.UpdatedAt,
    //             CreatedAt = d.CreatedAt,
    //         };
    //     }
    // }
    //
    // public static Appoint CreateEntity(this CreateAppointDto d)
    // {
    //     return new Appoint
    //     {
    //         Id = Guid.NewGuid(),
    //         OwnerId = d.OwnerId,
    //         Name = d.Name,
    //         Rating = d.Rating,
    //         Description = d.Description,
    //         Address = d.Address,
    //         Region = d.Region,
    //         Phone = d.Phone,
    //         Email = d.Email,
    //         CreatedAt = DateTime.UtcNow,
    //     };
    // }
}
