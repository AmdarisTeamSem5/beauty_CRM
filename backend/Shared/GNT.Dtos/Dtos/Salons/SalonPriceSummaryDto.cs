using GNT.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GNT.Shared.Dtos.Pricing
{
    public sealed class SalonPriceSummaryDto
    {
        public Guid SalonId { get; init; }
        public string Name { get; init; } = default!;
        public decimal? AvgPrice { get; init; }         // null when salon has 0 services
        public int ServicesCount { get; init; }
        public PriceBand? Band { get; init; }
    }

}
