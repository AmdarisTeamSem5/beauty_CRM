
namespace GNT.Shared.Dtos.Specialists
{
    public class CreateSpecialistDto
    {
        public CreateSpecialistDto()
        {

        }

        public CreateSpecialistDto(
                Guid id
        )
        {
            Id = id;
        }

        public Guid Id;
        public Guid SalonId { get; set; }
        public string FullName { get; set; }
        public string Description { get; set; }
        public string ImageString64 { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

    }
}
