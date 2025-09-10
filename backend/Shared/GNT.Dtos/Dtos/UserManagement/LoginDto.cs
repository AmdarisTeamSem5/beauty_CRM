namespace GNT.Shared.Dtos.UserManagement;

public class LoginDto
{
    public LoginDto()
    {
    }

    public LoginDto(string email, string password, string securityCode = null)
    {
        Email = email;
        Password = password;
        SecurityCode = securityCode;
    }

    public string Email { get; set; }
    public string Password { get; set; }
    public string SecurityCode { get; set; }
}
