using GNT.Shared.Enums;

namespace GNT.Shared.Dtos.Salons
{
    public class EditSalonDto
    {
        public EditSalonDto()
        {

        }

        public EditSalonDto(
            Guid? ownerId,
            string? name,
            float? rating,
            string? description,
            string? address,
            Region? region,
            string? phone,
            string? email,
            DateTime updatedAt
                )
        {
            OwnerId = ownerId;
            Name = name;
            Rating = rating;
            Description = description;
            Address = address;
            Region = region;
            Phone = phone;
            Email = email;
            UpdatedAt = updatedAt;
        }

        public Guid? OwnerId { get; set; }
        public string? Name { get; set; }
        public float? Rating { get; set; }
        public string? Description { get; set; }
        public string? Address { get; set; }
        public Region? Region { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public DateTime UpdatedAt { get; set; }


    }
}
