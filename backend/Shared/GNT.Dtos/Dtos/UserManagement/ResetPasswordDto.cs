namespace GNT.Shared.Dtos.UserManagement;

public class ResetPasswordDto
{
    public ResetPasswordDto()
    {

    }

    public ResetPasswordDto(string email, string securityCode, string newPassword)
    {
        Email = email;
        SecurityCode = securityCode;
        NewPassword = newPassword;
    }

    public string Email { get; set; }
    public string SecurityCode { get; set; }
    public string NewPassword { get; set; }
}
