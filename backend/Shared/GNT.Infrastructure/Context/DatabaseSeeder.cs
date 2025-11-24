using System;
using GNT.Dtos.Enums;
using GNT.Infrastructure.Context;
using GNT.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using GNT.Shared.Enums;
using GNT.Application.Account.Utils;

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
                    // Check if tables exist by trying to query
                    bool tablesExist = false;
                    try
                    {
                        appDbContext.Database.ExecuteSqlRaw("SELECT TOP 1 1 FROM [User]");
                        tablesExist = true;
                    }
                    catch
                    {
                        // Tables don't exist
                        tablesExist = false;
                    }
                    
                    // If tables don't exist, create them
                    if (!tablesExist)
                    {
                        // Drop database to start fresh
                        try
                        {
                            appDbContext.Database.EnsureDeleted();
                        }
                        catch { }
                        
                        // Use EnsureCreated to create tables directly from model
                        // This is more reliable when migrations aren't found
                        appDbContext.Database.EnsureCreated();
                    }
                }

                // Ensure tables exist before trying to seed
                try
                {
                    appDbContext.Database.ExecuteSqlRaw("SELECT TOP 1 1 FROM [User]");
                }
                catch
                {
                    // Last resort - ensure tables are created
                    appDbContext.Database.EnsureCreated();
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
                        //Parola11a#
                        Password = "Ad+PeWsjpYteZQB4As2eTX+Rsd9WT1aYslx0jAJtcT1K0a5M6LSUl2NPeWVYihAxoA==",
                        UserRoles = new[] { new UserRole() { Role = adminRole } }
                    };

                    // Create sample salon owners
                    var salonOwner1 = new User
                    {
                        Email = "maria@luxebeauty.com",
                        FirstName = "Maria",
                        LastName = "Rodriguez",
                        Password = AccountService.HashPassword("Password123!"),
                        PhoneNumber = "+373 123 456 789",
                        UserRoles = new[] { new UserRole() { Role = userRole } }
                    };

                    var salonOwner2 = new User
                    {
                        Email = "elena@glamournails.com",
                        FirstName = "Elena",
                        LastName = "Popescu",
                        Password = AccountService.HashPassword("Password123!"),
                        PhoneNumber = "+373 123 456 790",
                        UserRoles = new[] { new UserRole() { Role = userRole } }
                    };

                    var salonOwner3 = new User
                    {
                        Email = "ana@skincare.com",
                        FirstName = "Ana",
                        LastName = "Ionescu",
                        Password = AccountService.HashPassword("Password123!"),
                        PhoneNumber = "+373 123 456 791",
                        UserRoles = new[] { new UserRole() { Role = userRole } }
                    };

                    appDbContext.Role.AddRange(adminRole, userRole);
                    appDbContext.User.AddRange(admin, salonOwner1, salonOwner2, salonOwner3);
                    appDbContext.SaveChanges(); // Save users first to get their IDs

                    // Create salons
                    if (appDbContext.Salon.Count() == 0)
                    {
                        var salons = new List<Salon>
                        {
                            new Salon
                            {
                                OwnerId = salonOwner1.Id,
                                Name = "Luxe Beauty Studio",
                                Rating = 4.8f,
                                Band = PriceBand.High,
                                Description = "Premium beauty salon offering hair, nails, and skincare services. Experience luxury in the heart of the city.",
                                Address = "123 Main Street, Centru",
                                Region = Region.centru,
                                Phone = "+373 123 456 789",
                                Email = "maria@luxebeauty.com",
                                CreatedAt = DateTime.UtcNow,
                                UpdatedAt = DateTime.UtcNow
                            },
                            new Salon
                            {
                                OwnerId = salonOwner2.Id,
                                Name = "Glamour Nails & Spa",
                                Rating = 4.6f,
                                Band = PriceBand.Medium,
                                Description = "Specialized nail salon with expert technicians. We offer gel nails, acrylics, and relaxing spa treatments.",
                                Address = "456 Broadway Avenue, Botanica",
                                Region = Region.botanica,
                                Phone = "+373 123 456 790",
                                Email = "elena@glamournails.com",
                                CreatedAt = DateTime.UtcNow,
                                UpdatedAt = DateTime.UtcNow
                            },
                            new Salon
                            {
                                OwnerId = salonOwner3.Id,
                                Name = "Radiant Skin Care Center",
                                Rating = 4.9f,
                                Band = PriceBand.High,
                                Description = "Advanced skincare treatments and facials. Our certified estheticians provide personalized skincare solutions.",
                                Address = "789 Wellness Boulevard, Buiucani",
                                Region = Region.buiucani,
                                Phone = "+373 123 456 791",
                                Email = "ana@skincare.com",
                                CreatedAt = DateTime.UtcNow,
                                UpdatedAt = DateTime.UtcNow
                            },
                            new Salon
                            {
                                OwnerId = salonOwner1.Id,
                                Name = "Hair Art Studio",
                                Rating = 4.7f,
                                Band = PriceBand.Medium,
                                Description = "Professional hair salon specializing in cuts, coloring, and styling. Book your transformation today!",
                                Address = "321 Style Street, Ciocana",
                                Region = Region.ciocana,
                                Phone = "+373 123 456 792",
                                Email = "info@hairart.com",
                                CreatedAt = DateTime.UtcNow,
                                UpdatedAt = DateTime.UtcNow
                            },
                            new Salon
                            {
                                OwnerId = salonOwner2.Id,
                                Name = "Beauty Express",
                                Rating = 4.5f,
                                Band = PriceBand.Low,
                                Description = "Affordable beauty services for everyone. Quick and quality service in a friendly atmosphere.",
                                Address = "555 Quick Lane, Riscani",
                                Region = Region.riscani,
                                Phone = "+373 123 456 793",
                                Email = "info@beautyexpress.com",
                                CreatedAt = DateTime.UtcNow,
                                UpdatedAt = DateTime.UtcNow
                            }
                        };

                        appDbContext.Salon.AddRange(salons);
                    }
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


 



    }
}
