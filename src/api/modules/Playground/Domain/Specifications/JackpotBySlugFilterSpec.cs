using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;

namespace SolanaSpin.WebApi.Playground.Domain.Specifications;
public class JackpotBySlugFilterSpec : Specification<Jackpot>
{
    public JackpotBySlugFilterSpec(string slug) =>
        Query.Where(x => EF.Functions.Like(slug, x.Slug));
}
