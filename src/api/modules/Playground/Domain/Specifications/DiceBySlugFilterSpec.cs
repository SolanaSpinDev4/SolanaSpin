using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;

namespace SolanaSpin.WebApi.Playground.Domain.Specifications;
public class DiceBySlugFilterSpec : Specification<Dice>
{
    public DiceBySlugFilterSpec(string slug) =>
        Query.Where(x => EF.Functions.Like(slug, x.Slug));
}
