using System.ComponentModel.DataAnnotations;
using MediatR;
using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.Get.v1;
public record GetDiceRequest(
    Guid Id) : IRequest<DiceDto>;
