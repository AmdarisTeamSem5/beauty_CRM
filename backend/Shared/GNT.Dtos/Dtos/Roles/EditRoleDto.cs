namespace GNT.Shared.Dtos.Roles
{
    public class EditRoleDto
    {
        public EditRoleDto()
        {
        }

        public EditRoleDto(string name, string description)
        {
            Name = name;
            Description = description;
        }

        public string Name { get; set; }
        public string Description { get; set; }
    }
}
