using Blazored.LocalStorage;
using System.Globalization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

namespace GNT.Common.Client.Services
{
    public static class WebAssemblyHostExtensions
    {
        public async static Task SetDefaultCulture(this WebAssemblyHost host)
        {
            var localStorage = host.Services.GetService<ILocalStorageService>();

            var cultureString = await localStorage.GetItemAsync<string>("culture");

            CultureInfo cultureInfo;

            if (!string.IsNullOrWhiteSpace(cultureString))
            {
                cultureInfo = new CultureInfo(cultureString);
            }
            else
            {
                cultureInfo = new CultureInfo("en-US");
            }

            CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
            CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;
            CultureInfo.CurrentCulture.DateTimeFormat = new DateTimeFormatInfo();
        }
    }
}
