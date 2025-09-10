namespace GNT.Shared.Dtos.UserManagement;

public class EditUserDto
{
    public EditUserDto()
    {

    }

    public EditUserDto(string firstName, string lastName, bool? isBlocked)
    {
        FirstName = firstName;
        LastName = lastName;
        IsBlocked = isBlocked;
    }

    public EditUserDto(UserDto model)
    {
        FirstName = model.FirstName;
        LastName = model.LastName;
        IsBlocked = model.IsBlocked;
    }

    public string FirstName { get; set; }
    public string LastName { get; set; }
    public bool? IsBlocked { get; set; }
}
