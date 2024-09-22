using System.ComponentModel;
using MediatR;
using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.CreateJackpot;
public record CreateJackpotCommand(
    [property: DefaultValue("New Jackpot")] string Title,
    [property: DefaultValue("new-jackpot")] string Slug,
    [property: DefaultValue(false)] bool IsEnabled,
    [property: DefaultValue(0)] decimal LimitAmount,
    [property: DefaultValue(0)] decimal CollectPercentage,
    [property: DefaultValue(null)] decimal? MinimumPlayAmountToWin,
    [property: DefaultValue(null)] decimal? MaximumPlayAmountToWin) : IRequest<JackpotDto>;
