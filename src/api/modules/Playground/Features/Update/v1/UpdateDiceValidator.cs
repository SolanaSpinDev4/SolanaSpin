using FluentValidation;
using SolanaSpin.WebApi.Playground.Persistence;

namespace SolanaSpin.WebApi.Playground.Features.Update.v1;
public class UpdateDiceValidator : AbstractValidator<UpdateDiceCommand>
{
    public UpdateDiceValidator(PlaygroundDbContext context)
    {
        RuleFor(p => p.Id).NotEmpty();
    }
}
