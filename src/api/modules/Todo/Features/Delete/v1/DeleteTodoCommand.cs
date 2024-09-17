using System.ComponentModel;
using MediatR;

namespace SolanaSpin.WebApi.Todo.Features.Delete.v1;
public sealed record DeleteTodoCommand(
    Guid Id) : IRequest;



