using FluentValidation;
using SolanaSpin.WebApi.Playground.Persistence;

namespace SolanaSpin.WebApi.Playground.Features.Play.v1;
public class  PlayDiceValidator : AbstractValidator<PlayDiceRequest>
{
    public PlayDiceValidator(PlaygroundDbContext context)
    {
        RuleFor(p => p.DiceSlug).NotEmpty();
        RuleFor(p => p.PlayAmount).GreaterThan(0);
    }
}
