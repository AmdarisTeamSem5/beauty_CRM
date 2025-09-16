namespace GNT.Shared.Dtos.SalonServices
{
    public class CreateSalonServiceDto
    {
        public CreateSalonServiceDto()
        {

        }

        public CreateSalonServiceDto(
            string name,
            string description,
            Guid salonId,
            Guid specialistId,
            int durationMinutes,
            int priceMDL)
        {
            Name = name;
            Description = description;
            SalonId = salonId;
            SpecialistId = specialistId;
            DurationMinutes = durationMinutes;
            PriceMDL = priceMDL;
        }

        public string Name { get; set; }
        public string Description { get; set; }
        public Guid SalonId { get; set; }
        public Guid SpecialistId { get; set; }
        public int DurationMinutes { get; set; }
        public int PriceMDL { get; set; }
    }
}
