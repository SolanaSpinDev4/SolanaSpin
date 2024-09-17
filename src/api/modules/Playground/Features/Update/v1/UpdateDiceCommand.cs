using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using MediatR;
using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.Update.v1;
public sealed record UpdateDiceCommand(
    [property: Required] Guid Id,
    [property: DefaultValue(null)] string? Title,
    [property: DefaultValue(null)] string? Slug,
    [property: DefaultValue(null)] bool? IsPubliclyPlayable,
    [property: DefaultValue(null)] decimal? MinimumPlayAmount,
    [property: DefaultValue(false)] bool ResetMinimumPlayAmount,
    [property: DefaultValue(null)] decimal? MaximumPlayAmount,
    [property: DefaultValue(false)] bool ResetMaximumPlayAmount,
    [property: DefaultValue(null)] IEnumerable<Face>? Faces) : IRequest<DiceDto>;
