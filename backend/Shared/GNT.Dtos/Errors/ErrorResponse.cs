namespace GNT.Shared.Errors
{
    public  class ErrorResponse
    {
        public ErrorResponse()
        {

        }

        public ErrorResponse(Error error)
        {
            Errors = new List<Error>() { error };
        }

        public ErrorResponse(IEnumerable<Error> errors)
        {
            Errors = errors;
        }

        public IEnumerable<Error> Errors { get; set; }
    }

    public class Error
    { 
        public Error() { }
        public Error(FailureCode code, string message)
        {
            Code = code;
            Message = message;
        }

        public FailureCode Code { get; set; }
        public string Message { get; set; }
    }
}
