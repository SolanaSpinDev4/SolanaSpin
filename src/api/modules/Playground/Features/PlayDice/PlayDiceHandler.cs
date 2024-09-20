using FSH.Framework.Core.Persistence;
using SolanaSpin.WebApi.Playground.Domain;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SolanaSpin.WebApi.Playground.Exceptions;
using SolanaSpin.WebApi.Playground.Domain.Specifications;
using Mapster;

namespace SolanaSpin.WebApi.Playground.Features.PlayDice;
public sealed class PlayDiceHandler(
    ILogger<PlayDiceHandler> logger,
    [FromKeyedServices("playground:dice")] IRepository<Dice> repository)
    : IRequestHandler<PlayDiceRequest, PlayDiceResponse>
{
    public async Task<PlayDiceResponse> Handle(PlayDiceRequest request, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(request);
        var item = await repository.FirstOrDefaultAsync(new DiceBySlugFilterSpec(request.DiceSlug), cancellationToken)
            ?? throw new DiceSlugNotFoundException(request.DiceSlug);

        if (!item.Faces.Any())
        {
            throw new PlayDiceWithNoFacesException(item.Id);
        }

        // TODO
        var faceIndex = 0;
        var returnAmount = request.PlayAmount;

        logger.LogInformation("dice {Id} played", item.Id);
        return new(request, new(item.Adapt<DiceDto>(), faceIndex, returnAmount));
    }
}

