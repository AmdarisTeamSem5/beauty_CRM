namespace GNT.Shared.Dtos.UserManagement
{
    public class CreateUserDto
    {
        public CreateUserDto()
        {

        }

        public CreateUserDto(string email, string firstName, string lastName, bool isBlocked)
        {
            FirstName = firstName;
            LastName = lastName;
            IsBlocked = isBlocked;
            Email = email;
        }

        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsBlocked { get; set; }
    }
}
