
namespace GNT.Shared.Dtos.Appointments
{
    public class CreateAppointmentDto
    {
        public CreateAppointmentDto()
        {

        }

        public CreateAppointmentDto(
            Guid clientId,
            // User client,
            Guid salonServiceId,
            Guid salonId,
            DateTime appointmentDate,
            bool comfirmed,
            Guid specialistId
        )
        {
            ClientId = clientId;
            // Client = client;
            SalonServiceId = salonServiceId;
            SalonId = salonId;
            AppointmentDate = appointmentDate;
            Confirmed = comfirmed;
        }

        public Guid ClientId { get; set; }
        // public string Client { get; set; }
        public Guid SalonServiceId { get; set; }
        public Guid SalonId { get; set; }
        public DateTime AppointmentDate { get; set; }
        public bool Confirmed { get; set; }


    }
}
