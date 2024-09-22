using Asp.Versioning;
using FSH.Framework.Infrastructure.Auth.Policy;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace SolanaSpin.WebApi.Playground.Features.PlayDice;
public static class PlayDiceEndpoint
{
    internal static RouteHandlerBuilder MapPlayDiceEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapPost("/", async (PlayDiceRequest request, ISender mediator) =>
                {
                    var response = await mediator.Send(request);
                    return Results.Ok(response);
                })
                .WithName(nameof(PlayDiceEndpoint))
                .WithSummary("Plays a dice")
                .WithDescription("Plays a dice")
                .Produces<PlayDiceResponse>()
                .RequirePermission("Permissions.Dice.Play")
                .MapToApiVersion(new ApiVersion(1, 0));
    }
}
