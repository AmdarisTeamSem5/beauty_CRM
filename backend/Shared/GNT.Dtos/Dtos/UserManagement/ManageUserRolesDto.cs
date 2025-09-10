namespace GNT.Shared.Dtos.UserManagement
{
    public class ManageUserRolesDto
    {
        public ManageUserRolesDto()
        {

        }

        public ManageUserRolesDto(IEnumerable<Guid> rolesToAdd, IEnumerable<Guid> rolesToRemove)
        {
            RolesToAdd = rolesToAdd;
            RolesToRemove = rolesToRemove;
        }

        public IEnumerable<Guid> RolesToAdd { get; set; }
        public IEnumerable<Guid> RolesToRemove { get; set; }
    }
}
