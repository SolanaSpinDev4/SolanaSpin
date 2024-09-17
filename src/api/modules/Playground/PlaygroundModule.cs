using Carter;
using FSH.Framework.Core.Persistence;
using FSH.Framework.Infrastructure.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using SolanaSpin.WebApi.Playground.Domain;
using SolanaSpin.WebApi.Playground.Features.Create.v1;
using SolanaSpin.WebApi.Playground.Features.Delete.v1;
using SolanaSpin.WebApi.Playground.Features.Get.v1;
using SolanaSpin.WebApi.Playground.Features.GetList.v1;
using SolanaSpin.WebApi.Playground.Features.Play.v1;
using SolanaSpin.WebApi.Playground.Features.Update.v1;
using SolanaSpin.WebApi.Playground.Persistence;

namespace SolanaSpin.WebApi.Playground;
public static class PlaygroundModule
{

    public class Endpoints : CarterModule
    {
        public override void AddRoutes(IEndpointRouteBuilder app)
        {
            var diceGroup = app.MapGroup("dice").WithTags("dice");
            diceGroup.MapCreateDiceEndpoint();
            diceGroup.MapGetDiceEndpoint();
            diceGroup.MapGetDiceListEndpoint();
            diceGroup.MapUpdateDiceEndpoint();
            diceGroup.MapDeleteDiceEndpoint();
            diceGroup.MapPlayDiceEndpoint();
        }
    }
    public static WebApplicationBuilder RegisterPlaygroundServices(this WebApplicationBuilder builder)
    {
        ArgumentNullException.ThrowIfNull(builder);
        builder.Services.BindDbContext<PlaygroundDbContext>();
        builder.Services.AddScoped<IDbInitializer, PlaygroundDbInitializer>();
        builder.Services.AddKeyedScoped<IRepository<Dice>, PlaygroundRepository<Dice>>("playground:dice");
        builder.Services.AddKeyedScoped<IReadRepository<Dice>, PlaygroundRepository<Dice>>("playground:dice");
        return builder;
    }
    public static WebApplication UsePlaygroundModule(this WebApplication app)
    {
        return app;
    }
}
