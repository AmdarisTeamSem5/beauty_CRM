using System.Security.Claims;
using System.Text;
using System.Text.Json;
using Blazored.LocalStorage;
using Microsoft.AspNetCore.Components.Authorization;
using Newtonsoft.Json;

namespace GNT.Common.Client.Services
{
    public class ServerAuthenticationStateProvider : AuthenticationStateProvider
    {
        private readonly ILocalStorageService localStorage;

        public ServerAuthenticationStateProvider(ILocalStorageService localStorage)
        {
            this.localStorage = localStorage;
        }

        public override async Task<AuthenticationState> GetAuthenticationStateAsync()
        {
            //await localStorage.SetItemAsStringAsync("token", "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJmdWxsTmFtZSI6IkN2dSBUZW1wbGF0ZSIsInVzZXJSb2xlcyI6IkFkbWluaXN0cmF0b3IiLCJyb2xlSWQiOiIxIiwidXNlcklkIjoiMSIsImVtYWlsQWRkcmVzcyI6ImN2dS50ZW1wbGF0ZUBjdnUucm8iLCJGaXJzdE5hbWUiOiJDdnUiLCJMYXN0TmFtZSI6IlRlbXBsYXRlIiwibmJmIjoxNjYwMjQxMjIxLCJleHAiOjE2NjAyNTAyMjEsImlzcyI6InRlbXBsYXRlc2VydmVyIiwiYXVkIjoidGVtcGxhdGVjbGllbnQifQ.");

            var token = await localStorage.GetItemAsync<string>("jwt-cookie");

            if(token == null)
            {
                return new AuthenticationState(new ClaimsPrincipal());
            }

            var decoder = new JwtDecoder(token, true);

            var claims = decoder._payload.Select(d => new Claim(d.Key.ToString(), d.Value.ToString())).ToList();
            

            var claimIdentity = new List<ClaimsIdentity>() { new ClaimsIdentity(claims, "JWT","emailAdress", "userRoles") };

            return new AuthenticationState(new ClaimsPrincipal(claimIdentity));
        }
    }

    public static class StringExtensions
    {
        public static int GetNextHighestMultiple(this int source, int multipicand)
        {
            int result = source;
            while ((result % multipicand) != 0)
            {
                result++;
            }
            return result;
        }
    }


    public class JwtDecoder
    {
        private Dictionary<string, object> _header;
        public Dictionary<string, object> _payload;
        private string _token = String.Empty;

        public JwtDecoder(string token, bool autoDecode = false)
        {
            _token = token;
            if (autoDecode) Decode();
        }

        public void Decode()
        {
            string[] parts = _token.Split('.');
            if (parts.Length != 3) throw new Exception("Malformed JWT token");

            string b64Header = parts[0];
            string b64Payload = parts[1];

            // B64 strings must be a length that is a multiple of 4 to decode them, so ensure this before we try to use them
            if (b64Header.Length % 4 != 0)
            {
                var lengthToBe = b64Header.Length.GetNextHighestMultiple(4);
                b64Header = b64Header.PadRight(lengthToBe, '=');
            }

            if (b64Payload.Length % 4 != 0)
            {
                var lengthToBe = b64Payload.Length.GetNextHighestMultiple(4);
                b64Payload = b64Payload.PadRight(lengthToBe, '=');
            }

            string headerJson = Encoding.UTF8.GetString(Convert.FromBase64String(b64Header));
            string payloadJson = Encoding.UTF8.GetString(Convert.FromBase64String(b64Payload));

            _header = JsonConvert.DeserializeObject<Dictionary<string, object>>(headerJson);
            _payload = JsonConvert.DeserializeObject<Dictionary<string, object>>(payloadJson);

        }

        public object GetKey(string keyName)
        {
            if (!_payload.ContainsKey(keyName)) throw new Exception($"JWT Token does not contain key {keyName}");
            return _payload[keyName];
        }

    }
}
