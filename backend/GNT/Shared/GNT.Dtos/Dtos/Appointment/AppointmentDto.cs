namespace GNT.Shared.Dtos.Appointments;

public class AppointmentDto
{
    public Guid Id { get; set; }
    public Guid ClientId { get; set; } // the user who made the appointment
    // public User Client { get; set; }
    // public Guid SalonServiceId { get; set; } // the service for the appointment 
    public Guid SpecialistId { get; set; }
    public Guid SalonId { get; set; } // SalonService also contains the information about the salon so it doesn't need to be stored
    // public DateTime AppointmentDate { get; set; }
    public bool Confirmed { get; set; }
    // public DateTime CreatedAt { get; set; }
    // public DateTime UpdatedAt { get; set; }

}
