dotnet ef migrations add %1 --project Shared\GNT.Infrastructure\ --startup-project Presentation\GNT.Web.Server\
dotnet ef database update --project Shared\GNT.Infrastructure\ --startup-project Presentation\GNT.Web.Server\


