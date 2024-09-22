using System.Globalization;
using Blazored.LocalStorage;
using SolanaSpin.Blazor.Infrastructure.Api;
using SolanaSpin.Blazor.Infrastructure.Auth;
using SolanaSpin.Blazor.Infrastructure.Auth.Jwt;
using SolanaSpin.Blazor.Infrastructure.Notifications;
using SolanaSpin.Blazor.Infrastructure.Preferences;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MudBlazor;
using MudBlazor.Services;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

namespace SolanaSpin.Blazor.Infrastructure;
public static class Extensions
{
    private const string ClientName = "FullStackHero.API";
    public static IServiceCollection AddClientServices(this IServiceCollection services, IConfiguration config, IWebAssemblyHostEnvironment hostEnvironment)
    {
        services.AddMudServices(configuration =>
        {
            configuration.SnackbarConfiguration.PositionClass = Defaults.Classes.Position.BottomRight;
            configuration.SnackbarConfiguration.HideTransitionDuration = 100;
            configuration.SnackbarConfiguration.ShowTransitionDuration = 100;
            configuration.SnackbarConfiguration.VisibleStateDuration = 3000;
            configuration.SnackbarConfiguration.ShowCloseIcon = false;
        });
        services.AddBlazoredLocalStorage();
        services.AddAuthentication(config);
        services.AddTransient<IApiClient, ApiClient>();
        services.AddHttpClient(ClientName, client =>
        {
            client.DefaultRequestHeaders.AcceptLanguage.Clear();
            client.DefaultRequestHeaders.AcceptLanguage.ParseAdd(CultureInfo.DefaultThreadCurrentCulture?.TwoLetterISOLanguageName);
            client.BaseAddress = new Uri(string.IsNullOrEmpty(config["ApiBaseUrl"]) ? hostEnvironment.BaseAddress : config["ApiBaseUrl"]!);
        })
           .AddHttpMessageHandler<JwtAuthenticationHeaderHandler>()
           .Services
           .AddScoped(sp => sp.GetRequiredService<IHttpClientFactory>().CreateClient(ClientName));
        services.AddTransient<IClientPreferenceManager, ClientPreferenceManager>();
        services.AddTransient<IPreference, ClientPreference>();
        services.AddNotifications();
        return services;

    }
}
