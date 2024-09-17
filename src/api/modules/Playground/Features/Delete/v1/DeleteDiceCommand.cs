using MediatR;

namespace SolanaSpin.WebApi.Playground.Features.Delete.v1;
public sealed record DeleteDiceCommand(
    Guid Id) : IRequest;

