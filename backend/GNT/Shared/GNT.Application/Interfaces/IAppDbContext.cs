using GNT.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace GNT.Application.Interfaces
{
    public interface IAppDbContext
    {
        DbSet<User> User { get; set; }
        DbSet<UserRole> UserRole { get; set; }
        DbSet<UserSecurityCode> UserSecurityCode { get; set; }

        DbSet<Role> Role { get; set; }
        DbSet<RolePermission> RolePermission { get; set; }

        DbSet<Salon> Salon { get; set; }
        DbSet<SalonService> SalonService { get; set; }
        // DbSet<SalonServiceType> SalonService { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
        Task<int> AddAndSaveChangesAsync<T>(T entity, CancellationToken cancellationToken);
    }
}
