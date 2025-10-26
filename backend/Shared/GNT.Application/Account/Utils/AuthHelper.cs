using GNT.Common.Extensions;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Collections.Concurrent;
using System.Security.Cryptography;
using System.Text;

namespace GNT.Application.Account.Utils;

public static class AuthHelper
{
    private static readonly ConcurrentDictionary<string, string> Keys;

    private static readonly string FilePath;
    private const string AesEncryptionKey = "F3777711E7B2C7A821BDB3B21C9A7945";
    private static readonly object LockObj = new();

    static AuthHelper()
    {
        Keys = new ConcurrentDictionary<string, string>();

        FilePath = Path.Combine(".", "user-keys.json");

        if (!File.Exists(FilePath))
        {
            return;
        }

        using var fileStream = new FileStream(FilePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
        using var textReader = new StreamReader(fileStream);

        var encryptedJson = textReader.ReadToEnd();

        var json = Decrypt(encryptedJson);

        JsonConvert.PopulateObject(json, Keys);
    }

    public static SymmetricSecurityKey GetUserKey(string email)
    {
        if (!Keys.TryGetValue(email, out var userKey))
        {
            userKey = Convert.ToBase64String(Encoding.ASCII.GetBytes(StringExtensions.GenerateRandomString(100)))
                .Replace("+", string.Empty)
                .Replace("=", string.Empty);

            Keys[email] = userKey;

            var json = JsonConvert.SerializeObject(Keys);
            var encryptedJson = Encrypt(json);

            var directoryPath = Path.GetDirectoryName(FilePath);

            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }

            lock (LockObj)
            {
                File.WriteAllText(FilePath, encryptedJson);
            }
        }

        var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(userKey));

        return securityKey;
    }

    public static void RemoveUserKey(string email = null)
    {
        Keys.TryRemove(email, out _);
    }
    
    private static string Encrypt(string text)
    {
        using var aes = Aes.Create();
        aes.Key = Encoding.UTF8.GetBytes(AesEncryptionKey);
        aes.IV = new byte[16];

        var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

        using var ms = new MemoryStream();
        using var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write);
        using (var sw = new StreamWriter(cs))
        {
            sw.Write(text);
        }

        return Convert.ToBase64String(ms.ToArray());
    }

    private static string Decrypt(string text)
    {
        var bytes = Convert.FromBase64String(text);

        using var aes = Aes.Create();
        aes.Key = Encoding.UTF8.GetBytes(AesEncryptionKey);
        aes.IV = new byte[16];

        var decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

        using var ms = new MemoryStream(bytes);
        using var cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read);
        using var sr = new StreamReader(cs);
        return sr.ReadToEnd();
    }
}
