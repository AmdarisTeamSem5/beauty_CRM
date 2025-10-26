using GNT.Shared.Errors;

namespace GNT.ExceptionHandling;

public class SalonServiceException : ApplicationException
{
    public SalonServiceException(FailureCode failureReason)
    {
        FailureReason = failureReason;
    }

    public FailureCode FailureReason { get; }
}
