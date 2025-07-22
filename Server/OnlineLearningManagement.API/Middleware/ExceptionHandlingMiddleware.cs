using System.Net;
using System.Text.Json;

namespace OnlineLearningManagement.API.Middleware
{
	public class ExceptionHandlingMiddleware
	{
		private readonly RequestDelegate _next;
		private readonly ILogger<ExceptionHandlingMiddleware> _logger;

		public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
		{
			_next = next;
			_logger = logger;
		}

		public async Task InvokeAsync(HttpContext context)
		{
			try
			{
				await _next(context);
			}
			catch (KeyNotFoundException ex)
			{
				_logger.LogWarning(ex, "Resource not found: {Message}", ex.Message);
				await HandleExceptionAsync(context, HttpStatusCode.NotFound, ex.Message);
			}
			catch (UnauthorizedAccessException ex)
			{
				_logger.LogWarning(ex, "Unauthorized access: {Message}", ex.Message);
				await HandleExceptionAsync(context, HttpStatusCode.Unauthorized, ex.Message);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "An unexpected error occurred: {Message}", ex.Message);
				await HandleExceptionAsync(context, HttpStatusCode.InternalServerError, "An unexpected error occurred.");
			}
		}

		private static async Task HandleExceptionAsync(HttpContext context, HttpStatusCode statusCode, string message)
		{
			context.Response.ContentType = "application/json";
			context.Response.StatusCode = (int)statusCode;

			var result = JsonSerializer.Serialize(new
			{
				error = message
			});

			await context.Response.WriteAsync(result);
		}
	}
}
