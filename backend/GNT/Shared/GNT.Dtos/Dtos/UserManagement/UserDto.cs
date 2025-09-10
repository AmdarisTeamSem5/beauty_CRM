namespace GNT.Shared.Dtos.UserManagement;

public class UserDto
{
    public Guid Id { get; set; }

    public string Email { get; set; }

    public string FirstName { get; set; }
    public string LastName { get; set; }

    public bool IsBlocked { get; set; }
}
