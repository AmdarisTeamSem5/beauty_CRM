using GNT.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace GNT.Application.Interfaces
{
    public interface IAppDbContext
    {
        DbSet<BusinessProduct> BusinessProduct { get; set; }

        DbSet<User> User { get; set; }
        DbSet<UserRole> UserRole { get; set; }
        DbSet<UserSecurityCode> UserSecurityCode { get; set; }
        
        DbSet<Role> Role { get; set; }
        DbSet<RolePermission> RolePermission { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
        Task<int> AddAndSaveChangesAsync<T>(T entity, CancellationToken cancellationToken);
    }
}
