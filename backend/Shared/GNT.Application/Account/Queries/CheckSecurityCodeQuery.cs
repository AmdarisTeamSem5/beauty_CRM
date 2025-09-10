using GNT.Dtos.Enums;
using Microsoft.EntityFrameworkCore;

namespace GNT.Application.Account.Queries
{
    public class CheckSecurityCodeQuery : IRequest<bool>
    {
        public CheckSecurityCodeQuery(string securityCode, SecurityCodeTypes type)
        {
            SecurityCode = securityCode;
            Type = type;
        }

        public string SecurityCode { get; set; }
        public SecurityCodeTypes Type { get; set; }
    }

    internal class CheckSecurityCodeQueryHandler : RequestHandler<CheckSecurityCodeQuery, bool>
    {
        public CheckSecurityCodeQueryHandler(IServiceProvider serviceProvider) : base(serviceProvider)
        {
        }

        public async override Task<bool> Handle(CheckSecurityCodeQuery request, CancellationToken cancellationToken)
        {
            var dbSecurityCode = await appDbContext.UserSecurityCode.Where(d=>d.Code == request.SecurityCode).FirstOrDefaultAsync(cancellationToken);

            if(dbSecurityCode == null 
                || dbSecurityCode.ExpiresAt < DateTime.Now
                || appDbContext.UserSecurityCode.Any(d => d.UserId == dbSecurityCode.UserId && d.Id != dbSecurityCode.Id && d.Type == dbSecurityCode.Type && d.CreatedAt > dbSecurityCode.CreatedAt)
                || dbSecurityCode.SuccessfullyUsed)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}
