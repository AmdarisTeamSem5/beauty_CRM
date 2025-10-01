using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace GNT.Infrastructure.Context
{
    public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
            try
            {
                optionsBuilder.UseSqlServer(
"Server=127.0.0.1,1433;Database=CRM_Salons_DB;User Id=sa;Password=Str0ng!Pass;Encrypt=False;TrustServerCertificate=True;"                );
            }
            catch
            {   // try another string
                try
                {
                    optionsBuilder.UseSqlServer(
                    "Server=localhost;Database=CRM_Salons_DB;Trusted_Connection=True;TrustServerCertificate=True;");
                }
                catch
                {
                }
            }

            return new AppDbContext(optionsBuilder.Options);
        }
    }
}
