/**
 * Central API Configuration
 * All API endpoints should use this base URL
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5191/api";

/**
 * Helper function to create full API endpoint URL
 */
export function getApiUrl(endpoint: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
}

/**
 * Default fetch options for API calls
 */
export const defaultFetchOptions: RequestInit = {
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include", // Include cookies in requests (needed for JWT cookie)
};

/**
 * Helper function for API calls with error handling
 */
export async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = getApiUrl(endpoint);
  const config: RequestInit = {
    ...defaultFetchOptions,
    ...options,
    headers: {
      ...defaultFetchOptions.headers,
      ...options?.headers,
    },
  };

  try {
    // Log the URL being called for debugging
    if (process.env.NODE_ENV === "development") {
      console.log(`[API] Calling: ${url}`);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      let errorMessage =
        response.statusText || `Request failed with status ${response.status}`;

      try {
        const contentType = response.headers.get("content-type") || "";
        const errorText = await response.text();
        if (errorText) {
          if (contentType.includes("application/json")) {
            const errorData = JSON.parse(errorText);

            // Handle backend error format: { Errors: [{ Code, Message }] }
            if (
              errorData.Errors &&
              Array.isArray(errorData.Errors) &&
              errorData.Errors.length > 0
            ) {
              errorMessage = errorData.Errors[0].Message || errorMessage;
            } else if (errorData.message) {
              errorMessage = errorData.message;
            } else if (typeof errorData === "string") {
              errorMessage = errorData;
            }
          } else {
            // Non-JSON error body (e.g. ASP.NET exception text like "System.UnauthorizedAccessException")
            errorMessage = errorText;
          }
        }
      } catch (parseError) {
        // If parsing fails (e.g. backend returned plain text but marked as JSON),
        // keep the existing errorMessage and log a lightweight warning in dev.
        if (process.env.NODE_ENV === "development") {
          console.warn("Failed to parse error response as JSON");
        }
      }

      // Provide clearer message for common auth-related statuses
      if (response.status === 401) {
        errorMessage =
          "You are not authorized. Please log in and try again.";
      } else if (response.status === 403) {
        errorMessage = "You do not have permission to perform this action.";
      }

      const error = new Error(errorMessage);
      (error as any).status = response.status;
      (error as any).response = response;
      throw error;
    }

    // Handle empty responses (204 No Content)
    if (response.status === 204 || response.headers.get("content-length") === "0") {
      return {} as T;
    }

    // Handle JSON responses
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const text = await response.text();
      return text ? JSON.parse(text) : ({} as T);
    }

    return {} as T;
  } catch (error) {
    // Re-throw if it's already our formatted error
    if (error instanceof Error && (error as any).status) {
      throw error;
    }
    
    // Handle network errors
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      const networkError = new Error("Unable to connect to the server. Please check if the backend is running.");
      (networkError as any).isNetworkError = true;
      throw networkError;
    }
    
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
}

