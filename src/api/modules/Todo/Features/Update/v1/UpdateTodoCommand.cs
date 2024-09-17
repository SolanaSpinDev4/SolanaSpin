using System.ComponentModel;
using MediatR;

namespace SolanaSpin.WebApi.Todo.Features.Update.v1;
public sealed record UpdateTodoCommand(
    Guid Id,
    string? Title,
    string? Note = null): IRequest<UpdateTodoResponse>;



