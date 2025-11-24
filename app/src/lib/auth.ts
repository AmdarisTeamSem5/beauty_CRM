/**
 * Authentication utilities
 * Helper functions for checking authentication state
 *
 * NOTE: The backend issues JWTs in a cookie whose name is configured via
 * TokenProviderOptions.CookieName. In appsettings.Development.json this is:
 *
 *   "TokenProvider": {
 *     ...
 *     "CookieName": "jwt-token",
 *     ...
 *   }
 *
 * So the frontend must look for `jwt-token`, not the old `jwt-cookie`.
 */

const JWT_COOKIE_NAME = "jwt-token";

/**
 * Check if user is authenticated by checking for JWT cookie
 * Note: This is a simple check. In production, you might want to verify the token is valid.
 */
export function isAuthenticated(): boolean {
  if (typeof document === "undefined") return false;

  const cookies = document.cookie.split(";");
  return cookies.some((cookie) =>
    cookie.trim().startsWith(`${JWT_COOKIE_NAME}=`)
  );
}

/**
 * Get the JWT token from cookies
 * (The backend reads the token from this cookie; the frontend rarely needs
 *  the raw value, but this stays for potential future use.)
 */
export function getToken(): string | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  const jwtCookie = cookies.find((cookie) =>
    cookie.trim().startsWith(`${JWT_COOKIE_NAME}=`)
  );

  if (jwtCookie) {
    return jwtCookie.split("=")[1]?.trim() || null;
  }

  return null;
}

