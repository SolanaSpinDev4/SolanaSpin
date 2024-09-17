using System.ComponentModel;
using MediatR;

namespace SolanaSpin.WebApi.Playground.Features.Play.v1;
public record PlayDiceRequest(
    [property: DefaultValue("dice-slug")] string DiceSlug,
    [property: DefaultValue(0.1)] decimal PlayAmount) : IRequest<PlayDiceResponse>;
