using GNT.Shared.Errors;

namespace GNT.ExceptionHandling;

public class SalonException : ApplicationException
{
    public SalonException(FailureCode failureReason)
    {
        FailureReason = failureReason;
    }

    public FailureCode FailureReason { get; }
}
