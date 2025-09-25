using GNT.Application;
using GNT.Application.Interfaces;
using GNT.Domain.BaseModels;
using GNT.Domain.Models;
using Microsoft.EntityFrameworkCore;


namespace GNT.Infrastructure.Context;

public class AppDbContext : DbContext, IAppDbContext
{
    private ISession session;

    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }

    public AppDbContext(DbContextOptions<AppDbContext> options, ISession session)
        : base(options)
    {
        this.session = session;
    }

    public virtual DbSet<User> User { get; set; }
    public virtual DbSet<UserRole> UserRole { get; set; }
    public virtual DbSet<UserSecurityCode> UserSecurityCode { get; set; }

    public virtual DbSet<Role> Role { get; set; }
    public virtual DbSet<RolePermission> RolePermission { get; set; }

    public virtual DbSet<Salon> Salon { get; set; }
    public virtual DbSet<SalonService> SalonService { get; set; }
    public virtual DbSet<PriceBandOptions> PriceBandOptions { get; set; }
    public virtual DbSet<Appointment> Appointment { get; set; }
    public virtual DbSet<Specialist> Specialist { get; set; }


    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        SetBaseProperties();

        return base.SaveChangesAsync(cancellationToken);
    }

    public async Task<int> AddAndSaveChangesAsync<T>(T entity, CancellationToken cancellationToken)
    {
        Add(entity);

        return await SaveChangesAsync(cancellationToken);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(Role).Assembly);

        modelBuilder.Entity<Salon>()
            .HasOne(s => s.Owner)
            .WithMany(u => u.Salons)
            .HasForeignKey(s => s.OwnerId)
            .OnDelete(DeleteBehavior.Restrict);

        base.OnModelCreating(modelBuilder);
    }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
    }

    private void SetBaseProperties()
    {
        var entries = ChangeTracker.Entries<BaseEntity>();


    }
}
