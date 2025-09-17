using GNT.Dtos.Enums;
using GNT.Infrastructure.Context;
using GNT.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using GNT.Shared.Enums;

namespace GNT.Infrastructure
{
    public static class DatabaseSeeder
    {
        public static void SeedDatabase(this WebApplication app)
        {
            using (var serviceScope = app.Services.CreateScope())
            {
                var services = serviceScope.ServiceProvider;

                var appDbContext = services.GetRequiredService<AppDbContext>();

                if (appDbContext.Database.IsRelational())
                {
                    appDbContext.Database.Migrate();
                }

                if (appDbContext.User.Count() == 0)
                {
                    var adminRole = new Role
                    {
                        Name = "Administrator",
                        IsDefaultRole = true,
                        RolePermissions = new[]
                        {
                            new RolePermission() {PermissionId = Permission.ViewUsers},
                            new RolePermission() {PermissionId = Permission.ManageUsers},
                            new RolePermission() {PermissionId = Permission.ViewRoles},
                            new RolePermission() {PermissionId = Permission.ManageRoles},
                            new RolePermission() {PermissionId = Permission.ViewProducts},
                            new RolePermission() {PermissionId = Permission.ManageProducts}
                        }

                    };

                    var userRole = new Role
                    {
                        Name = "User",
                        IsDefaultRole = true,
                        RolePermissions = new[]
                        {
                            new RolePermission() {PermissionId = Permission.ViewUsers},
                            new RolePermission() {PermissionId = Permission.ManageUsers},
                            new RolePermission() {PermissionId = Permission.ViewRoles},
                            new RolePermission() {PermissionId = Permission.ManageRoles},
                            new RolePermission() {PermissionId = Permission.ViewProducts},
                            new RolePermission() {PermissionId = Permission.ManageProducts}
                        }
                    };

                    var admin = new User
                    {
                        Email = "claudiugeanta@gmail.com",
                        FirstName = "Cvu",
                        LastName = "Template",
                        CreatedAt = new DateTime(2018, 1, 1),
                        LastUpdatedAt = new DateTime(2018, 1, 1),
                        //Parola11a#
                        Password = "Ad+PeWsjpYteZQB4As2eTX+Rsd9WT1aYslx0jAJtcT1K0a5M6LSUl2NPeWVYihAxoA==",
                        UserRoles = new[] { new UserRole() { Role = adminRole } }
                    };


                    appDbContext.Role.AddRange(adminRole, userRole);
                    appDbContext.User.AddRange(admin);

                }

                if (appDbContext.BusinessProduct.Count() == 0)
                {
                    var products = SeedProducts(500);

                    appDbContext.AddRange(products);

                }

                if (appDbContext.Salon.Count() == 0)
                {
                    List<Salon> salons = salons = SeedSalons(10);

                    appDbContext.AddRange(salons);
                }

                if (appDbContext.SalonService.Count() == 0)
                {
                    var salons = appDbContext.Salon;
                    foreach (var salon in salons)
                    {
                        var salon_services = new List<SalonService>();

                        for (int i = 1; i <= 10; i++)
                        {
                            salon_services.Add(new SalonService
                            {
                                Id = Guid.NewGuid(),
                                SalonId = salon.Id,
                                Type = (SalonServiceType)(i * 10),
                                SpecialistId = Guid.NewGuid(),
                                Name = $"Dummy_service_{i}_for_{salon}",
                                Description = $"Dummy description for service {(SalonServiceType)(i * 10)}",
                                DurationMinutes = i,
                                PriceMDL = i * 50,
                            });
                        }

                        appDbContext.AddRange(salon_services);
                    }
                }


                appDbContext.SaveChanges();
            }
        }

        private static List<Salon> SeedSalons(int count = 10)
        {
            var salons = new List<Salon>();
            for (int i = 1; i <= count; i++)
            {
                salons.Add(new Salon
                {
                    OwnerId = Guid.NewGuid(),
                    Name = $"DummySalone_{i}",
                    Description = $"This is the {i}_th dummy salone",
                    Address = "",
                    Region = (Region)(i % 5),
                    Phone = "",
                    Email = ""
                });
            }
            return salons;
        }


        private static List<BusinessProduct> SeedProducts(int count = 100)
        {
            var products = new List<BusinessProduct>();
            var random = new Random();
            var types = Enum.GetValues(typeof(BusinessProductType));

            for (int i = 1; i <= count; i++)
            {
                var dateIn = DateTime.Today.AddDays(-random.Next(1, 365));
                var dateOut = dateIn.AddDays(random.Next(1, 100));

                var product = new BusinessProduct
                {
                    Name = $"Product {i}",
                    Price = Math.Round((decimal)(random.NextDouble() * 1000), 2),
                    Type = (BusinessProductType)types.GetValue(random.Next(types.Length)),
                    IsInStock = random.Next(2) == 1,
                    DatetIn = dateIn,
                    DateOut = dateOut
                };

                products.Add(product);
            }

            return products;
        }
    }
}
