using GNT.Shared.Dtos.Pagination;
using MudBlazor;
using System.Reflection;

namespace GNT.Common.Client.Services
{
    public static class Generics
    {
        public static T GetDifferences<T>(T original, T changed) where T : class
        {
            T editModel = (T)Activator.CreateInstance(typeof(T));

            foreach (PropertyInfo property in original.GetType().GetProperties())
            {
                object value1 = property.GetValue(original, null);
                object value2 = property.GetValue(changed, null);

                if (value1 is Dictionary<string, string>)
                {
                    var diferences = GetDistinctValues(value1 as Dictionary<string, string>, value2 as Dictionary<string, string>);

                    editModel.GetType().GetProperty(property.Name).SetValue(editModel, diferences);
                }
                else
                {
                    var different = (value1 == null && value2 != null) || (value1 != null && value2 != null && !value1.Equals(value2));

                    if (different)
                    {
                        editModel.GetType().GetProperty(property.Name).SetValue(editModel, value2);
                    }
                }
            }
            return editModel;
        }

        static Dictionary<string, string> GetDistinctValues(Dictionary<string, string> originalDict, Dictionary<string, string> editedDict)
        {
            var distinctDict = new Dictionary<string, string>();

            foreach (var kvp in originalDict)
            {
                if (editedDict[kvp.Key] != kvp.Value)
                {
                    distinctDict.Add(kvp.Key, editedDict[kvp.Key]);
                }
            }

            return distinctDict;
        }

        public static void SetGridStateParams<T>(this PageQuery queryParam, GridState<T> gridState)
        {
            queryParam.Page = gridState.Page + 1;
            queryParam.PageSize = gridState.PageSize;
            queryParam.SortBy = gridState.SortDefinitions.Select(d => new KeyValuePair<string, bool>(d.SortBy, d.Descending)).ToList();

            //todo
            queryParam.Filters = gridState.FilterDefinitions.Select(d => new FilterDefinition
            {
                PropertyName = d.Title,
                //d.FieldType
                Condition = d.Operator,
                //Value = d.Value
            })
            .ToList();

        }
    }
}
