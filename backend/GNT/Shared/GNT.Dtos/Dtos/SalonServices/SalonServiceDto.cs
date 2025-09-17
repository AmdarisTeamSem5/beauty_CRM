using GNT.Shared.Enums;

namespace GNT.Shared.Dtos.SalonServices;


public class SalonServiceDto
{
    public Guid Id { get; set; }
    public Guid SalonId { get; set; }
    public Guid SpecialistId { get; set; }
    public SalonServiceType Type { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int DurationMinutes { get; set; }
    public int PriceMDL { get; set; }

}
