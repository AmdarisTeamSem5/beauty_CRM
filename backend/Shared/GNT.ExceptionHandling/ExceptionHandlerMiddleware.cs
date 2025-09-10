using GNT.Shared.Errors;
using GNT.Shared.Translate;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;
using System.Text.Json;

namespace GNT.ExceptionHandling.Middlewears
{
	public class ExceptionHandlerMiddleware
	{
		private readonly RequestDelegate next;
		private readonly TranslateService translate;

		public ExceptionHandlerMiddleware(RequestDelegate next, TranslateService translate)
		{
			this.next = next;
			this.translate = translate;

        }
		public async Task Invoke(HttpContext context)
		{
			try
			{
				await next(context);
			}
			catch (ApplicationException ex)
			{
				object responseBody;

				switch (ex)
				{
					case BusinessException exception:
						context.Response.StatusCode = StatusCodes.Status400BadRequest;
						responseBody = new ErrorResponse(new List<Error>() { new Error(exception.FailureReason, translate[exception.FailureReason]) });
                        context.Response.ContentType = "application/json";
                        break;
					case RequestValidationFailedException exception:
						context.Response.StatusCode = StatusCodes.Status400BadRequest;
                        context.Response.ContentType = "application/json";
                        responseBody = new ErrorResponse(exception.Failures.Select(d=> new Error(d, translate[d])));
						break;
                    default:
						context.Response.StatusCode = StatusCodes.Status500InternalServerError;
						responseBody = new ErrorResponse(new List<Error>() { new Error(FailureCode.InternalError, translate[FailureCode.InternalError]) });
						break;
				}

				await context.Response.WriteAsync(JsonSerializer.Serialize(responseBody));
			}
		}
	}

	public static class ExceptionMiddlewareExtension
	{
        public static IApplicationBuilder UseCustomExceptionHandler(this IApplicationBuilder app)
		{
			return app.UseMiddleware<ExceptionHandlerMiddleware>();
        }

    }
}
