using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using MediatR;
using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.UpdateJackpot;
public sealed record UpdateJackpotCommand(
    [property: Required] Guid Id,
    [property: DefaultValue(null)] string? Title,
    [property: DefaultValue(null)] string? Slug,
    [property: DefaultValue(false)] bool? IsEnabled,
    [property: DefaultValue(0)] decimal? LimitAmount,
    [property: DefaultValue(0)] decimal? CollectPercentage,
    [property: DefaultValue(null)] decimal? MinimumPlayAmountToWin,
    [property: DefaultValue(false)] bool ResetMinimumPlayAmountToWin,
    [property: DefaultValue(null)] decimal? MaximumPlayAmountToWin,
    [property: DefaultValue(false)] bool ResetMaximumPlayAmountToWin) : IRequest<JackpotDto>;
