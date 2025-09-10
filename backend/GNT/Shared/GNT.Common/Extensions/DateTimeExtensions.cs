namespace GNT.Common.Extensions
{
    public static class DateTimeExtensions
    {
        public static string ToShortString(this DateTime dateTime)
        {
            return dateTime.ToString("dd.MM.yyyy");
        }
    }
}
