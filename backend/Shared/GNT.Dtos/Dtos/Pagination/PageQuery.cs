namespace GNT.Shared.Dtos.Pagination;


public class PageQuery<T> : PageQuery
{
    public PageQuery(T extraModel) : base()
    {
        ExtraModel = extraModel;
    }

    public T ExtraModel { get; set; }
}

public class PageQuery
{
    public PageQuery()
    {
        SortBy = new List<KeyValuePair<string, bool>>();
        Filters = new List<FilterDefinition>();
    }

    private const int MaxPageSize = 200;
    private int _pageSize = 10;
    public int Page { get; set; } = 1;

    public List<KeyValuePair<string, bool>> SortBy { get; set; }
    public List<FilterDefinition> Filters { get; set; }

    public int PageSize
    {
        get => _pageSize;

        set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
    }
}

public class FilterDefinition()
{
    public string PropertyName { get; set; }
    public string Condition { get; set; }
    public string Value { get; set; }
}
