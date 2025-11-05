using GNT.Domain.BaseModels;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using GNT.Shared.Dtos.SalonServices;
using GNT.Shared.Enums;

namespace GNT.Domain.Models;

public class SalonService : BaseEntity
{
    public Guid SalonId { get; set; }
    public SalonServiceType Type { get; set; }
    public Guid SpecialistId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int DurationMinutes { get; set; }
    public int PriceMDL { get; set; }
}

public class SalonServiceConfiguration : IEntityTypeConfiguration<SalonService>
{
    public void Configure(EntityTypeBuilder<SalonService> entity)
    {
        entity.ConfigureBase();
    }
}
public static class SalonServiceMapping
{
    public static Expression<Func<SalonService, SalonServiceDto>> DtoProjection
    {
        get
        {
            return d => new SalonServiceDto
            {
                Id = d.Id,
                SalonId = d.SalonId,
                Name = d.Name,
                Description = d.Description,
                Type = d.Type,
                SpecialistId = d.SpecialistId,
                DurationMinutes = d.DurationMinutes,
                PriceMDL = d.PriceMDL,
            };
        }
    }

    public static SalonService CreateEntity(this CreateSalonServiceDto d)
    {
        return new SalonService
        {
            Id = Guid.NewGuid(),
            SalonId = d.SalonId,
            Name = d.Name,
            Description = d.Description,
            Type = d.Type,
            SpecialistId = d.SpecialistId,
            DurationMinutes = d.DurationMinutes,
            PriceMDL = d.PriceMDL,
        };
    }
}
