using Ardalis.Specification;

namespace SolanaSpin.WebApi.Playground.Domain.Specifications;
public class JackpotBySlugFilterSpec : Specification<Jackpot>
{
    public JackpotBySlugFilterSpec(string slug) =>
        Query.Where(x => string.Equals(x.Slug, slug, StringComparison.OrdinalIgnoreCase));
}
