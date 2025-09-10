using GNT.Shared.Dtos.Pagination;

namespace GNT.Shared.Dtos.Roles
{
    public class RoleQueryModel : PageQuery
    {
        public string Search { get; set; }
    }
}
