using MediatR;

namespace SolanaSpin.WebApi.Playground.Features.DeleteDice;
public sealed record DeleteDiceCommand(
    Guid Id) : IRequest;

