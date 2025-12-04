namespace GNT.Shared.Dtos.UserManagement
{
    public class CreateUserDto
    {
        public CreateUserDto()
        {

        }

        public CreateUserDto(string email, string firstName, string lastName, string phoneNumber, bool isBlocked, string password = null)
        {
            FirstName = firstName;
            LastName = lastName;
            PhoneNumber = phoneNumber;
            IsBlocked = isBlocked;
            Email = email;
            Password = password;
        }

        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsBlocked { get; set; }
        public string Password { get; set; }
    }
}
