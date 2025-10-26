using GNT.Shared.Dtos.UserManagement;
using Microsoft.AspNetCore.Components.Authorization;

namespace GNT.Common.Client.Services
{
    public class CurrentUserService
    {
        private readonly AuthenticationStateProvider authStateProvider;
        private readonly CurrentUser currentUser;

        public CurrentUserService(AuthenticationStateProvider authStateProvider, CurrentUser currentUser)
        {
            this.authStateProvider = authStateProvider;
            this.currentUser = currentUser;
        }

        public async Task InitializeAsync()
        {
            var authState = await authStateProvider.GetAuthenticationStateAsync();

            var claims = authState.User?.Claims;

            if (claims?.Any() == true)
            {
                CurrentUser.MapUser(currentUser, claims.ToList());
            }
            else
            {
                currentUser.IsAuthenticated = false;
            }
        }
    }
}
