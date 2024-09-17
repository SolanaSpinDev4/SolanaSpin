using FluentValidation;
using SolanaSpin.WebApi.Todo.Persistence;

namespace SolanaSpin.WebApi.Todo.Features.Create.v1;
public class CreateTodoValidator : AbstractValidator<CreateTodoCommand>
{
    public CreateTodoValidator(TodoDbContext context)
    {
        RuleFor(p => p.Title).NotEmpty();
        RuleFor(p => p.Note).NotEmpty();
    }
}
