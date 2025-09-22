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
                "Data Source=.\\sqlexpress;Initial Catalog=CRM_Salons_DB;Integrated Security=SSPI;Persist Security Info=True;TrustServerCertificate=True;"
                );
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
