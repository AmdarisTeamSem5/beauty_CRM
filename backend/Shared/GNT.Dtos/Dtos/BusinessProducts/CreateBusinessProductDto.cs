using GNT.Shared.Enums;

namespace GNT.Shared.Dtos.BusinessProducts
{
    public class CreateBusinessProductDto
    {
        public CreateBusinessProductDto()
        {

        }

        public CreateBusinessProductDto(string name, decimal price, BusinessProductType type, bool isInStock, DateTime datetIn, DateTime dateOut)
        {
            Name = name;
            Price = price;
            Type = type;
            IsInStock = isInStock;
            DatetIn = datetIn;
            DateOut = dateOut;
        }

        public string Name { get; set; }
        public decimal Price { get; set; }
        public BusinessProductType Type { get; set; }
        public bool IsInStock { get; set; }
        public DateTime DatetIn { get; set; }
        public DateTime DateOut { get; set; }
    }
}
