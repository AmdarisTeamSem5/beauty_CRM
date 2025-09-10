using System.Security.Cryptography;

namespace GNT.Application.Account.Utils;

public static class Variables
{
    public static readonly int PasswordValidity = 30;

    // Salt used to encrypt password
    public static readonly string Salt = "J2hrGsTUL~9+;QE~8ZZ5V";

    // Security code validity in seconds
    public static readonly double SecurityCodeValidity = TimeSpan.FromMinutes(5).TotalSeconds;

    public static readonly double CookieExpiration = TimeSpan.FromDays(1).TotalHours;
}

public static class AccountService
{
    private const int Pbkdf2IterCount = 1000; // default for Rfc2898DeriveBytes
    private const int Pbkdf2SubkeyLength = 256 / 8; // 256 bits
    private const int SaltSize = 128 / 8; // 128 bits

    public static string HashPassword(string password)
    {
        if (password == null)
        {
            throw new ArgumentNullException(nameof(password));
        }

        password = Variables.Salt + password;

        byte[] salt = new byte[SaltSize];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }

        byte[] subkey;
        using (var deriveBytes = new Rfc2898DeriveBytes(password, salt, Pbkdf2IterCount, HashAlgorithmName.SHA256))
        {
            subkey = deriveBytes.GetBytes(Pbkdf2SubkeyLength);
        }

        var outputBytes = new byte[1 + SaltSize + Pbkdf2SubkeyLength];

        outputBytes[0] = 0x01;

        Buffer.BlockCopy(salt, 0, outputBytes, 1, SaltSize);
        Buffer.BlockCopy(subkey, 0, outputBytes, 1 + SaltSize, Pbkdf2SubkeyLength);

        return Convert.ToBase64String(outputBytes);
    }


    public static bool IsValidPassword(string providedPassword, string hashedPassword)
    {
        if (hashedPassword == null)
            throw new ArgumentNullException(nameof(hashedPassword));
        if (providedPassword == null)
            throw new ArgumentNullException(nameof(providedPassword));

        byte[] decodedHashedPassword = Convert.FromBase64String(hashedPassword);

        if (decodedHashedPassword.Length != 1 + SaltSize + Pbkdf2SubkeyLength || decodedHashedPassword[0] != 0x01)
            return false; 

        byte[] salt = new byte[SaltSize];
        Buffer.BlockCopy(decodedHashedPassword, 1, salt, 0, SaltSize);

        byte[] expectedSubkey = new byte[Pbkdf2SubkeyLength];
        Buffer.BlockCopy(decodedHashedPassword, 1 + SaltSize, expectedSubkey, 0, Pbkdf2SubkeyLength);

        byte[] actualSubkey;
        using (var deriveBytes = new Rfc2898DeriveBytes(Variables.Salt + providedPassword, salt, Pbkdf2IterCount, HashAlgorithmName.SHA256))
        {
            actualSubkey = deriveBytes.GetBytes(Pbkdf2SubkeyLength);
        }

        return CryptographicOperations.FixedTimeEquals(actualSubkey, expectedSubkey);
    }
}
