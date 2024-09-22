using FluentValidation;
using SolanaSpin.WebApi.Playground.Persistence;

namespace SolanaSpin.WebApi.Playground.Features.CreateJackpot;
public class CreateJackpotValidator : AbstractValidator<CreateJackpotCommand>
{
    public CreateJackpotValidator(PlaygroundDbContext context)
    {
        RuleFor(p => p.Title).NotEmpty();
        RuleFor(p => p.Slug).NotEmpty();
    }
}
