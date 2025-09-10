namespace GNT.Shared.Dtos.Roles
{
    public class CreateRoleDto
    {
        public CreateRoleDto()
        {

        }

        public CreateRoleDto(string name, string description)
        {
            Name = name;
            Description = description;
        }

        public string Name { get; set; }
        public string Description { get; set; }
    }
}
