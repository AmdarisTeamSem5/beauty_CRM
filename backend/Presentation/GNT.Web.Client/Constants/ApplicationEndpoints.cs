namespace GNT.Web.Client.Constants;

public static class ApplicationEndpoints
{
    public static string Authentication => "api/authentication";
    public static string Users => "api/user";
    public static string GetUsers => "api/user/get-all";

    public static string BusinessProducts => "api/businessproduct";
    public static string GetBusinessProducts => "api/businessproduct/get-all";

    public static string Roles => "api/role";
    public static string GetRoles => "api/role/get-all";

    public static string GetAllPermissions => "api/permission";

    public static string CheckSecurityCode => Authentication + "/security-code";
  
}

