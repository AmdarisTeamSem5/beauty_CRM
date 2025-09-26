namespace GNT.Shared.Dtos.UserManagement;

public class EditUserDto
{
    public EditUserDto()
    {

    }

    public EditUserDto(string firstName, string lastName,string phoneNumber, bool? isBlocked)
    {
        FirstName = firstName;
        LastName = lastName;
        PhoneNumber = phoneNumber;
        IsBlocked = isBlocked;
    }

    public EditUserDto(UserDto model)
    {
        FirstName = model.FirstName;
        LastName = model.LastName;
        PhoneNumber = model.PhoneNumber;
        IsBlocked = model.IsBlocked;
    }

    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }
    public bool? IsBlocked { get; set; }
}
