using GNT.Application.Account.Commands;
using GNT.Application.Account.Utils;
using GNT.Web.Server.Config;
using Microsoft.AspNetCore.Mvc;
using GNT.Application.Security;
using GNT.Application.Account.Queries;
using GNT.Dtos.Enums;
using Microsoft.Extensions.Options;
using GNT.Shared.Dtos.UserManagement;

namespace GNT.Web.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : BaseController
    {
        private readonly TokenProviderOptions tokenOptions;

        public AuthenticationController(IOptions<TokenProviderOptions> tokenOptions)
        {
            this.tokenOptions = tokenOptions.Value;
        }

        [HttpPost("send-two-factor-code")]
        public async Task SendTwoFactorAuthenticationCode([FromBody] LoginDto model)
        {
            await Mediator.Send(new SendTwoFactorCodeCommand(model.Email, model.Password));
        }

        [HttpPost("log-in")]
        public async Task<TokenDto> Login([FromBody] LoginDto model)
        {
            return await Mediator.Send(new LoginCommand(model.Email, model.Password, model.SecurityCode));
        }

        [HttpGet("log-out")]
        public IActionResult LogOut()
        {
            AuthHelper.RemoveUserKey();
            Response.Cookies.Delete(tokenOptions.CookieName);

            return Ok();
        }

        [HttpPost("reset-password-request")]
        public async Task SendResetPasswordCode([FromBody] string email)
        {
            await Mediator.Send(new ResetPasswordRequestCommand(email));
        }

        [HttpGet("security-code/{securityCode}")]
        public async Task<bool> CheckSecurityCode([FromRoute] string securityCode)
        {
            return await Mediator.Send(new CheckSecurityCodeQuery(securityCode, SecurityCodeTypes.ResetPassword));
        }

        [HttpPost("reset-password")]
        public async Task ResetPassword([FromBody] ResetPasswordDto model)
        {
            var command = new ResetPasswordCommand(model);

            await Mediator.Send(command);
        }
    }
}
