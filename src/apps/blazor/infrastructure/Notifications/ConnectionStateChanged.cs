using SolanaSpin.Blazor.Shared.Notifications;

namespace SolanaSpin.Blazor.Infrastructure.Notifications;

public record ConnectionStateChanged(ConnectionState State, string? Message) : INotificationMessage;