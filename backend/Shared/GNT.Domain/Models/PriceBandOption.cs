using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GNT.Domain.Models
{
    public sealed class PriceBandOptions
    {
        public Guid Id { get; set; }
        public decimal LowMax { get; init; } 
        public decimal MediumMax { get; init; } 
    }
}
