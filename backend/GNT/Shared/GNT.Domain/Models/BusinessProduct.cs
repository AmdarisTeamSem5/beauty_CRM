using GNT.Domain.BaseModels;
using GNT.Shared.Enums;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using GNT.Shared.Dtos.UserManagement;
using System.Linq.Expressions;
using GNT.Shared.Dtos.BusinessProducts;

namespace GNT.Domain.Models;

public class BusinessProduct : BaseEntity
{
    public string Name { get; set; }
    public decimal Price { get; set; }
    public BusinessProductType Type { get; set; }
    public bool IsInStock { get; set; }
    public DateTime DatetIn {  get; set; }
    public DateTime DateOut { get; set; }

}

public class BusinessProductConfiguration : IEntityTypeConfiguration<BusinessProduct>
{
    public void Configure(EntityTypeBuilder<BusinessProduct> entity)
    {
        entity.ConfigureBase();
    }
}

public static class BusinessProductMapping
{
    public static Expression<Func<BusinessProduct, BusinessProductDto>> DtoProjection
    {
        get
        {
            return d => new BusinessProductDto
            {
                Id = d.Id,
                Name = d.Name,
                Price = d.Price,
                Type = d.Type,
                IsInStock = d.IsInStock,
                DatetIn = d.DatetIn,
                DateOut = d.DateOut
            };
        }
    }

    public static BusinessProduct CreateEntity(this CreateBusinessProductDto d)
    {
        return new BusinessProduct
        {
            Id = Guid.NewGuid(),
            Name = d.Name,
            Price = d.Price,
            Type = d.Type,
            IsInStock = d.IsInStock,
            DatetIn = d.DatetIn,
            DateOut = d.DateOut
        };
    }
}
