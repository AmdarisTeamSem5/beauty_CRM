namespace GNT.Shared.Errors
{
    public enum FailureCode
    {
        InternalError,
        SecurityCodeExpired,
        SecurityCodeAlreadyUsed,
        InvalidCredentials,
        UserPermanentlyBlocked,
        UserTemporaryBlocked,
        InvalidSecurityCode,
        InvalidPasswordPattern,
        DuplicateEmail,
        InvalidEmailAddress,
        DuplicateRoleName,
        InvalidRoleId,
        NotFound,
        RequiredField
    }
}
