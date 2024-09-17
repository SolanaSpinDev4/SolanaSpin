﻿using FSH.Framework.Core.Domain;
using FSH.Framework.Core.Domain.Contracts;
using SolanaSpin.WebApi.Playground.Domain.Events;
using SolanaSpin.WebApi.Playground.Features.Create.v1;
using SolanaSpin.WebApi.Playground.Features.Update.v1;

namespace SolanaSpin.WebApi.Playground.Domain;
public enum FaceResultType
{
    Empty = 0,
    Multiplier,
    FixedAmount,
    Invitation
}
public class Face
{
    public FaceResultType ResultType { get; set; }
    public string? ResultValue { get; set; }
    public decimal Weight { get; set; }
}
public class DiceDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public bool IsPubliclyPlayable { get; set; }
    public decimal? MaximumPlayAmount { get; set; }
    public decimal? MinimumPlayAmount { get; set; }
    public IEnumerable<Face> Faces { get; set; } = [];
}
public class Dice : AuditableEntity, IAggregateRoot
{
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public bool IsPubliclyPlayable { get; set; }
    public decimal? MinimumPlayAmount { get; set; }
    public decimal? MaximumPlayAmount { get; set; }
    public IEnumerable<Face> Faces { get; set; } = [];

    public static Dice Create(CreateDiceCommand request)
    {
        var dice = new Dice
        {
            Title = request.Title,
            Slug = request.Slug,
            IsPubliclyPlayable = request.IsPubliclyPlayable,
            MinimumPlayAmount = request.MinimumPlayAmount,
            MaximumPlayAmount = request.MaximumPlayAmount,
            Faces = request.Faces ?? []
        };

        dice.QueueDomainEvent(new DiceCreated(dice));

        return dice;
    }

    public Dice Update(UpdateDiceCommand request)
    {
        if (request.Title is not null && Title?.Equals(request.Title, StringComparison.OrdinalIgnoreCase) is not true) Title = request.Title;
        if (request.Slug is not null && Slug?.Equals(request.Slug, StringComparison.OrdinalIgnoreCase) is not true) Slug = request.Slug;
        if (request.IsPubliclyPlayable.HasValue && !IsPubliclyPlayable.Equals(request.IsPubliclyPlayable.Value)) IsPubliclyPlayable = request.IsPubliclyPlayable.Value;
        if (request.MinimumPlayAmount.HasValue && !MinimumPlayAmount.Equals(request.MinimumPlayAmount.Value)) MinimumPlayAmount = request.MinimumPlayAmount.Value;
        if (request.ResetMinimumPlayAmount) MinimumPlayAmount = null;
        if (request.MaximumPlayAmount.HasValue && !MaximumPlayAmount.Equals(request.MaximumPlayAmount.Value)) MaximumPlayAmount = request.MaximumPlayAmount.Value;
        if (request.ResetMaximumPlayAmount) MaximumPlayAmount = null;
        if (request.Faces is not null) Faces = request.Faces;

        this.QueueDomainEvent(new DiceUpdated(this));

        return this;
    }
}
