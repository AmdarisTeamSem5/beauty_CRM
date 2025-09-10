using GNT.Shared.Enums;

namespace GNT.Shared.Dtos.BusinessProducts
{
    public class EditBusinessProductDto
    {
        public EditBusinessProductDto()
        {

        }

        public EditBusinessProductDto(string name, decimal? price, BusinessProductType? type, bool? isInStock, DateTime? datetIn, DateTime? dateOut)
        {
            Name = name;
            Price = price;
            Type = type;
            IsInStock = isInStock;
            DatetIn = datetIn;
            DateOut = dateOut;
        }

        public EditBusinessProductDto(BusinessProductDto model)
        {
            Name = model.Name;
            Price = model.Price;
            Type = model.Type;
            IsInStock = model.IsInStock;
            DatetIn = model.DatetIn;
            DateOut = model.DateOut;
        }

        public string Name { get; set; }
        public decimal? Price { get; set; }
        public BusinessProductType? Type { get; set; }
        public bool? IsInStock { get; set; }
        public DateTime? DatetIn { get; set; }
        public DateTime? DateOut { get; set; }
    }
}
