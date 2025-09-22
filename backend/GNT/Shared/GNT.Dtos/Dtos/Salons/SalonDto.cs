using GNT.Shared.Enums;

namespace GNT.Shared.Dtos.Salons;

public class SalonDto
{
    public Guid Id { get; set; }
    public Guid OwnerId { get; set; }
    public string Name { get; set; }
    public float Rating { get; set; }
    public string Description { get; set; }
    public string Address { get; set; }
    public Region Region { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public decimal Rating { get; set; }
    public int RatingCount { get; set; }

}
