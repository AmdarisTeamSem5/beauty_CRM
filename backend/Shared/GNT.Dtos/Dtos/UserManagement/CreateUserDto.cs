namespace GNT.Shared.Dtos.UserManagement
{
    public class CreateUserDto
    {
        public CreateUserDto()
        {

        }

        public CreateUserDto(string email, string firstName, string lastName, string phoneNumber, bool isBlocked)
        {
            FirstName = firstName;
            LastName = lastName;
            PhoneNumber = phoneNumber;
            IsBlocked = isBlocked;
            Email = email;
        }

        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsBlocked { get; set; }
    }
}
