using GNT.Domain.BaseModels;
// using GNT.Shared.Enums;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using GNT.Shared.Dtos.Appointments;



namespace GNT.Domain.Models;

public class Appointment : BaseEntity // inherits Id
{
    public Guid ClientId { get; set; } // the user who made the appointment
    public User Client { get; set; }
    public Guid SalonServiceId { get; set; } // the service for the appointment 
    public Guid SpecialistId { get; set; }
    public Guid SalonId { get; set; } // SalonService also contains the information about the salon so it doesn't need to be stored
    public DateTime AppointmentDate { get; set; }
    public bool Comfirmed { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}



public class AppointmentConfiguration : IEntityTypeConfiguration<Appointment>
{
    public void Configure(EntityTypeBuilder<Appointment> entity)
    {
        entity.ConfigureBase();
    }
}

public static class AppointmentMapping
{
    public static Expression<Func<Appointment, AppointmentDto>> DtoProjection
    {
        get
        {
            return d => new AppointmentDto
            {
                Id = d.Id,
                // ClientId = d.ClientId,
                // Client = d.Client,
                // SalonServiceId = d.SalonServiceId,
                // SalonId = d.SalonId,
                // AppointmentDate = d.AppointmentDate,
                // Comfirmed = d.Comfirmed,
                // UpdatedAt = d.UpdatedAt,
                // CreatedAt = d.CreatedAt,
            };
        }
    }

    public static Appointment CreateEntity(this CreateAppointmentDto d)
    {
        return new Appointment
        {
            Id = Guid.NewGuid(),
            ClientId = d.ClientId,
            // Client = d.Client,
            SalonServiceId = d.SalonServiceId,
            SalonId = d.SalonId,
            AppointmentDate = d.AppointmentDate,
            Comfirmed = d.Comfirmed,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
        };
    }
}
