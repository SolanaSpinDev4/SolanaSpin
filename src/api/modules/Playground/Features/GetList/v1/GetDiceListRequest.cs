using FSH.Framework.Core.Paging;
using MediatR;
using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.GetList.v1;
public record GetDiceListRequest(
    PaginationFilter Filter) : IRequest<PagedList<DiceDto>>;
