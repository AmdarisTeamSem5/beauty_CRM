using GNT.Domain.Models;
using GNT.Dtos.Enums;
using GNT.Common.Extensions;
using GNT.Shared.Errors;

namespace GNT.Application.Account.Utils
{
    public static class UserValidationExtension
    {
        public static void ValidatePassword(this User user, string inputPassword)
        {
            if(!AccountService.IsValidPassword(inputPassword, user.Password))
            {
                throw new BusinessException(FailureCode.InvalidCredentials);
            }
        }

        public static void ValidateStatus(this User user) 
        {
            if (user.IsBlocked && user.UnblockDate > DateTime.Now)
            {
                if (user.UnblockDate > DateTime.Now.AddYears(10))
                {
                    throw new BusinessException(FailureCode.UserPermanentlyBlocked);
                }
                else
                {
                    throw new BusinessException(FailureCode.UserTemporaryBlocked);
                }
            }
            else if(user.IsBlocked && user.UnblockDate < DateTime.Now)
            {
                user.IsBlocked = false;
                user.UnblockDate = null;
            }
        }

        public static UserSecurityCode GenerateUserSecurityCode(this User user, SecurityCodeTypes Type)
        {
            DateTime expiresAt = DateTime.Now;
            string code = "";

            switch(Type)
            {
                case SecurityCodeTypes.ResetPassword:
                    expiresAt = expiresAt.AddMinutes(30);
                    code = StringExtensions.GenerateRandomString(100);
                    break;
                case SecurityCodeTypes.TwoFactorAuthentication:
                    expiresAt = expiresAt.AddMinutes(5);
                    code = StringExtensions.GenerateRandomString(6, onlyDigits: true);
                    break;
            }

            var securityCode = new UserSecurityCode()
            {
                Code = code,
                CreatedAt = DateTime.Now,
                ExpiresAt = expiresAt,
                FailedAttempts = 0,
                Type = Type,
                UserId = user.Id
            };

            user.UserSecurityCodes.Add(securityCode);

            return securityCode;
        }

        public static FailureCode? ValidateUserSecurityCode(this User user, string requestSecurityCode)
        {
            FailureCode? validationResult = null;

            var securityCode = user.UserSecurityCodes.SingleOrDefault();

            if (securityCode != null && securityCode.Code == requestSecurityCode && !securityCode.SuccessfullyUsed && securityCode.ExpiresAt > DateTime.Now)
            {
                return validationResult;
            }
            else if (securityCode == null)
            {
                validationResult = FailureCode.InternalError;
            }
            else if (securityCode.ExpiresAt < DateTime.Now && securityCode.Code == requestSecurityCode)
            {
                validationResult = FailureCode.SecurityCodeExpired;
            }
            else if (securityCode.SuccessfullyUsed && securityCode.Code == requestSecurityCode)
            {
                validationResult = FailureCode.SecurityCodeAlreadyUsed;
            }
            else if (securityCode.Code != requestSecurityCode && securityCode.ExpiresAt > DateTime.Now)
            {
                securityCode.FailedAttempts++;

                if (securityCode.FailedAttempts >= 5)
                {
                    user.IsBlocked = true;
                    user.UnblockDate = DateTime.Now.AddHours(1);
                }

                validationResult = FailureCode.InvalidSecurityCode;
            }

            return validationResult;
        }

    }
}
