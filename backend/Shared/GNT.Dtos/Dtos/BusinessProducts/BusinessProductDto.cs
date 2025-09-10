using GNT.Shared.Enums;

namespace GNT.Shared.Dtos.BusinessProducts;

public class BusinessProductDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public BusinessProductType Type { get; set; }
    public bool IsInStock { get; set; }
    public DateTime DatetIn { get; set; }
    public DateTime DateOut { get; set; }
}
