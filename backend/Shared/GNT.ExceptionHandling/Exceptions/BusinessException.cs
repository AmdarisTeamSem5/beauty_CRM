using GNT.Shared.Errors;

namespace GNT.ExceptionHandling;

public class BusinessException : ApplicationException
{
    public BusinessException(FailureCode failureReason)
    {
        FailureReason = failureReason;
    }

    public FailureCode FailureReason { get; }
}
