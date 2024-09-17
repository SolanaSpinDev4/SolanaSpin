using Asp.Versioning;
using FSH.Framework.Infrastructure.Auth.Policy;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace SolanaSpin.WebApi.Playground.Features.Delete.v1;
public static class DeleteDiceEndpoint
{
    internal static RouteHandlerBuilder MapDeleteDiceEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints
            .MapDelete("/{id:guid}", async (Guid id, ISender mediator) =>
            {
                await mediator.Send(new DeleteDiceCommand(id));
                return Results.NoContent();
            })
            .WithName(nameof(DeleteDiceEndpoint))
            .WithSummary("Deletes a dice")
            .WithDescription("Deletes a dice")
            .Produces(StatusCodes.Status204NoContent)
            .RequirePermission("Permissions.Dice.Delete")
            .MapToApiVersion(new ApiVersion(1, 0));
    }
}
