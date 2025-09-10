namespace GNT.Shared.Dtos.Pagination
{
    public class PaginatedList<T>
    {
        public PaginatedList()
        {
            PageSummary = new PageSummary();
        }

        public PaginatedList(IEnumerable<T> list, PageSummary pageSummary)
        {
            PageSummary = pageSummary;
            Items = list;
        }

        public IEnumerable<T> Items { get; set; }
        public PageSummary PageSummary { get; set; }
    }
}
