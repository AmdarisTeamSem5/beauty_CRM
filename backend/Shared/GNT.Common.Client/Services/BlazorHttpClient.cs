using Blazored.LocalStorage;
using GNT.Shared.Errors;
using GNT.Shared.Dtos.Pagination;
using GNT.Shared.Translate;
using Microsoft.AspNetCore.Components;
using MudBlazor;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http.Json;
using System.Text;

namespace GNT.Common.Client.Services;

public class BlazorHttpClient
{
    private readonly HttpClient httpClient;
    private readonly ISnackbar snackbar;
    private readonly ILocalStorageService localStorage;
    private readonly NavigationManager navigationManager;
    private readonly TranslateService translate;

    public BlazorHttpClient(HttpClient httpClient, ISnackbar snackbar, ILocalStorageService localStorage, TranslateService translate, NavigationManager navigationManager)
    {
        this.httpClient = httpClient;
        this.snackbar = snackbar;
        this.localStorage = localStorage;
        this.navigationManager = navigationManager;
        this.translate = translate;
    }

    public async Task<TResponse> Get<TResponse>(string url)
    {
        await AddTokenIfExists();

        using var response = await httpClient.GetAsync(url);

        if (!await IsSuccessfull(response, false)) return default;

        return await TryDeserialize<TResponse>(response);
    }

    public async Task<GridData<TResponse>> GetServerGridData<TResponse>(string url, GridState<TResponse> state)
    {
        var queryModel = new PageQuery();

        queryModel.SetGridStateParams(state);

        var result = await Post<PageQuery, PaginatedList<TResponse>>(url, queryModel, false);

        return new GridData<TResponse>() { Items = result?.Items ?? Enumerable.Empty<TResponse>(), TotalItems = result?.PageSummary.TotalCount ?? 0 };
    }
    public async Task<GridData<TResponse>> GetServerGridData<TQuery, TResponse>(string url, GridState<TResponse> state, TQuery extraQueryModel)
    {
        var queryModel = new PageQuery<TQuery>(extraQueryModel);

        queryModel.SetGridStateParams(state);

        var result = await Post<PageQuery<TQuery>, PaginatedList<TResponse>>(url, queryModel);

        return new GridData<TResponse>() { Items = result.Items, TotalItems = result.PageSummary.TotalCount };
    }

    public async Task<bool> Post<TRequest>(string url, TRequest model)
    {
        await AddTokenIfExists();

        using var response = await httpClient.PostAsJsonAsync(url, model);

        return await IsSuccessfull(response);
    }

    public async Task<TResponse> Post<TRequest, TResponse>(string url, TRequest model, bool raiseSuccessMessage = true)
    {
        await AddTokenIfExists();

        using var response = await httpClient.PostAsJsonAsync(url, model);

        if (!await IsSuccessfull(response, raiseSuccessMessage)) return default;

        return await TryDeserialize<TResponse>(response);
    }

    public async Task<(bool success, TResponse responseBody)> PostWithStatus<TRequest, TResponse>(string url, TRequest model, bool raiseSuccessMessage = true)
    {
        await AddTokenIfExists();

        using var response = await httpClient.PostAsJsonAsync(url, model);

        if (!await IsSuccessfull(response, true)) return (false, default);

        var deserialized = await TryDeserialize<TResponse>(response);

        return (true, deserialized);
    }

    public async Task<TResponse> Put<TRequest, TResponse>(string url, TRequest model)
    {
        await AddTokenIfExists();

        using var response = await httpClient.PutAsJsonAsync(url, model);

        if (!await IsSuccessfull(response)) return default;

        return await TryDeserialize<TResponse>(response);
    }

    public async Task<bool> Patch<TRequest>(string url, TRequest model)
    {
        await AddTokenIfExists();

        var serializedDoc = JsonConvert.SerializeObject(model);
        var requestContent = new StringContent(serializedDoc, Encoding.UTF8, "application/json-patch+json");

        using var response = await httpClient.PatchAsync(url, requestContent);

        return await IsSuccessfull(response);
    }

    public async Task Put(string url)
    {
        await AddTokenIfExists();

        using var response = await httpClient.PutAsync(url, null);

        await IsSuccessfull(response);
    }

    public async Task<bool> Delete(string url)
    {
        await AddTokenIfExists();

        using var response = await httpClient.DeleteAsync(url);

        return await IsSuccessfull(response);
    }

    private async Task<bool> IsSuccessfull(HttpResponseMessage response, bool raiseSuccessMessage = true)
    {
        bool successfull = true;

        if (response.StatusCode == HttpStatusCode.Unauthorized)
        {
            await localStorage.RemoveItemAsync("jwt-cookie");

            //snackbar.Add(localizer[General.ExpiredSession], Severity.Error);

            navigationManager.NavigateTo("/", true);
        }
        else if (response.StatusCode == HttpStatusCode.Forbidden)
        {
            successfull = false;

            //snackbar.Add(localizer[General.NotEnoughPermissions], Severity.Error);
            navigationManager.NavigateTo($"{navigationManager.BaseUri}application");
        }
        else if (response.StatusCode == HttpStatusCode.NoContent)
        {
            successfull = true;
        }
        else if (response.StatusCode != HttpStatusCode.OK)
        {
            successfull = false;

            var reason = await response.Content.ReadFromJsonAsync<ErrorResponse>();

            RaiseError(reason?.Errors);
        }
        else if (raiseSuccessMessage)
        {
            snackbar.Add(translate[ErrorMessages.ActionProcessedSuccessfully], Severity.Success);
        }

        return successfull;
    }

    private void RaiseError(IEnumerable<Error> errors)
    {
        if (errors != null && errors.Any())
        {
            var errorMessage = "";

            foreach (var failure in errors.Distinct())
            {
                errorMessage += failure.Message + "\r\n";
            }

            snackbar.Add(errorMessage, Severity.Error);
        }
        else
        {
            snackbar.Add(translate[FailureCode.InternalError], Severity.Error);
        }
    }

    private async Task<TResponse> TryDeserialize<TResponse>(HttpResponseMessage response)
    {
        try
        {
            if (response?.Content == null || response.Content.Headers.ContentLength == 0)
            {
                return default;
            }

            return await response.Content.ReadFromJsonAsync<TResponse>();
        }
        catch
        {
            snackbar.Add(translate[ErrorMessages.ErrorDeserializingResponseOrInvalidServer]);
        }

        return default;
    }

    private async Task AddTokenIfExists()
    {
        await SetCurrentLanguage();

        var token = await localStorage.GetItemAsync<string>("jwt-cookie");

        var authorizationAdded = this.httpClient.DefaultRequestHeaders.TryGetValues("Authorization", out IEnumerable<string> values);

        if (!authorizationAdded && !string.IsNullOrEmpty(token))
        {
            var bearer = $"bearer {token.Replace("\'", "")}";

            this.httpClient.DefaultRequestHeaders.Add("Authorization", bearer);
        }
    }

    public async Task SetCurrentLanguage()
    {
        var culture = await localStorage.GetItemAsync<string>("culture");
        httpClient.DefaultRequestHeaders.Remove("x-language");
        httpClient.DefaultRequestHeaders.Add("x-language", culture);
    }

}
