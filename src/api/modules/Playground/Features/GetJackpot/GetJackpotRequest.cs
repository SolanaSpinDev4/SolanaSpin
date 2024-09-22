using System.ComponentModel.DataAnnotations;
using MediatR;
using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.GetJackpot;
public record GetJackpotRequest(
    Guid Id) : IRequest<JackpotDto>;
