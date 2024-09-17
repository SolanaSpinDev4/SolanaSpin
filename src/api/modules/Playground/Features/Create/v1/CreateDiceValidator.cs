using FluentValidation;
using SolanaSpin.WebApi.Playground.Persistence;

namespace SolanaSpin.WebApi.Playground.Features.Create.v1;
public class CreateDiceValidator : AbstractValidator<CreateDiceCommand>
{
    public CreateDiceValidator(PlaygroundDbContext context)
    {
        RuleFor(p => p.Title).NotEmpty();
        RuleFor(p => p.Slug).NotEmpty();
    }
}
