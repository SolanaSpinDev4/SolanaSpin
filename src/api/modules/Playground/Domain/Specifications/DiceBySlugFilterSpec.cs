using Ardalis.Specification;

namespace SolanaSpin.WebApi.Playground.Domain.Specifications;
public class DiceBySlugFilterSpec : Specification<Dice>
{
    public DiceBySlugFilterSpec(string slug) =>
        Query.Where(x => string.Equals(x.Slug, slug, StringComparison.OrdinalIgnoreCase));
}
