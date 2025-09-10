using System.Text.RegularExpressions;

namespace GNT.Common.Extensions
{
    public static class StringExtensions
    {
        public static string PasswordValidationExpression = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-+~()_]).{8,}$";

        public static bool IsAValidPasswordPattern(this string password)
        {
            return Regex.IsMatch(password, PasswordValidationExpression);
        }

        public static string SplitCamelCase(this string inputString)
        {
            return inputString.Aggregate(string.Empty, (result, next) =>
            {
                if (char.IsUpper(next) && result.Length > 0)
                {
                    result += ' ';
                }
                return result + next;
            });
        }

        public static string GenerateRandomString(int length, bool onlyDigits = false)
        {
            var random = new Random();

            string digits = "1234567890";

            string resultString = "";

            if (onlyDigits)
            {
                resultString = new string(Enumerable.Repeat(digits, length).Select(s => s[random.Next(s.Length)]).ToArray());
            }
            else
            {
                string letters = "abcdefghijklmnopqrstuvwxyz";
                string capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

                var all = letters + capitalLetters + digits;

                resultString = new string(Enumerable.Repeat(all, length).Select(s => s[random.Next(s.Length)]).ToArray());
            }

            return resultString;
        }

        public static string ToPascalCase(this string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                return value;
            }

            char[] a = value.ToCharArray();
            a[0] = char.ToUpperInvariant(a[0]);

            return new string(a);
        }

        public static string ToCamelCase(this string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                return value;
            }

            char[] a = value.ToCharArray();
            a[0] = char.ToLowerInvariant(a[0]);

            return new string(a);
        }

    }
}
