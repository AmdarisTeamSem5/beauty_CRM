using GNT.Shared.Dtos.UserManagement;
using Microsoft.AspNetCore.Http;

namespace GNT.Application.Interfaces;

public interface ISession
{
    CurrentUser CurrentUser { get; set; }
    IHttpContextAccessor HttpContextAccessor { get; set; }
}