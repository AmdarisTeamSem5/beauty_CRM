namespace GNT.Shared.Dtos.Roles;

public class RoleDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public bool IsDefault { get; set; }

    public override string ToString() => $"{Name}";
}