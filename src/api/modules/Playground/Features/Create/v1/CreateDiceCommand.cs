using System.ComponentModel;
using MediatR;
using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.Create.v1;
public record CreateDiceCommand(
    [property: DefaultValue("New Dice")] string Title,
    [property: DefaultValue("new-dice")] string Slug,
    [property: DefaultValue(false)] bool IsPubliclyPlayable,
    [property: DefaultValue(null)] decimal? MinimumPlayAmount,
    [property: DefaultValue(null)] decimal? MaximumPlayAmount,
    [property: DefaultValue(null)] IEnumerable<Face>? Faces) : IRequest<DiceDto>;
