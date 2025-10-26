using GNT.Common.Client.Components;
using MudBlazor;

namespace GNT.Web.Client.Services
{
    public class DialogsService
    {
        private readonly IDialogService dialogService;

        public DialogsService(IDialogService dialogService)
        {
            this.dialogService = dialogService;
        }

        public async Task<bool> OpenConfirmationDialog(string contentText)
        {
            var parameters = new DialogParameters
            {
                { "ContentText", contentText }
            };

            var dialog = await dialogService.ShowAsync<ConfirmationDialog>("Confirma", parameters);

            var option = await dialog.Result;

            return !option.Canceled;
        }

        public void OpenCudDialog<TComponent>(string dialogTitle, Guid? Id, Func<Task> Callback)
        {
            var options = new DialogOptions { CloseOnEscapeKey = true, FullWidth = true };

            var parameters = new DialogParameters
            {
                { "Id", Id },
                { "Callback", Callback }
            };

            dialogService.ShowAsync<CudDialog<TComponent>>(dialogTitle, parameters, options);
        }
    }
}
