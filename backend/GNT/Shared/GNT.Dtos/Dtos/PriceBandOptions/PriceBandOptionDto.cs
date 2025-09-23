using GNT.Shared.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GNT.Shared.Dtos.PriceBandOptions
{
    public sealed class PriceBandOptionDto
    {
        public PriceBand? Band { get; init; }                 // null = all
        public bool ExcludeSalonsWithNoServices { get; init; } = false;

        // Sorting: "AvgPrice" (default) or "Name"
        public string? OrderBy { get; init; } = "AvgPrice";
        public bool Desc { get; init; } = true;
    }

}
