using GNT.Dtos.Enums;

namespace GNT.Shared.Dtos.Roles;

public class ManageRolePermissionsDto
{
    public ManageRolePermissionsDto()
    {

    }

    public ManageRolePermissionsDto(IEnumerable<Permission> permissionsToAdd, IEnumerable<Permission> permissionsToRemove)
    {
        PermissionsToAdd = permissionsToAdd;
        PermissionsToRemove = permissionsToRemove;
    }

    public IEnumerable<Permission> PermissionsToAdd { get; set; }
    public IEnumerable<Permission> PermissionsToRemove { get; set; }
}
