using GNT.Shared.Errors;
using Microsoft.Extensions.Localization;

namespace GNT.Shared.Translate
{
    public class TranslateService
    {
        public readonly IStringLocalizer<General> General;
        public readonly IStringLocalizer<ErrorMessages> Error;
        public readonly IStringLocalizer<Enums> Enums;

        public TranslateService(IStringLocalizer<General> generalLocalizer, IStringLocalizer<ErrorMessages> errorLocalizer, IStringLocalizer<Enums> enumsLocalizer)
        {
            General = generalLocalizer;
            Error = errorLocalizer;
            Enums = enumsLocalizer;
        }

        public LocalizedString this[FailureCode code]
        {
            get
            {
                return Error[code.ToString()];
            }
        }

        public LocalizedString this[string code]
        {
            get
            {
                return General[code.ToString()];
            }
        }

        public LocalizedString Enum<TEnum>(TEnum value) where TEnum : struct, Enum
        {   
            return Enums[$"{typeof(TEnum).Name}_{value.ToString()}"];
        }

    }
}
