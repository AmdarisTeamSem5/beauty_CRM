using GNT.Shared.Enums;


namespace GNT.Shared.Dtos.Salons
{
    public class CreateSalonDto
    {
        public CreateSalonDto()
        {

        }

        public CreateSalonDto(
            Guid ownerId,
            string name,
            float rating,
            string description,
            string address,
            Region region,
            string phone,
            string email,
            int ratingCount
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
            RatingCount = ratingCount;
        }

        public Guid OwnerId { get; set; }
        public string Name { get; set; }
        public float Rating { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public Region Region { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public DateTime DateTime { get; set; }
        public int RatingCount { get; set; }


    }
}
