using MediatR;

namespace SolanaSpin.WebApi.Playground.Features.DeleteJackpot;
public sealed record DeleteJackpotCommand(
    Guid Id) : IRequest;

