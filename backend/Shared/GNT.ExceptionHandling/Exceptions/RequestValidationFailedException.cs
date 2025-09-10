using GNT.Shared.Errors;

namespace GNT.ExceptionHandling;

public class RequestValidationFailedException : ApplicationException
{
    public RequestValidationFailedException(IEnumerable<FailureCode> failures)
    {
        Failures = failures;
    }
    public IEnumerable<FailureCode> Failures { private set; get; }
}
