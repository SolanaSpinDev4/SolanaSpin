using SolanaSpin.Blazor.Shared.Notifications;

namespace SolanaSpin.Blazor.Infrastructure.Notifications;

public interface INotificationPublisher
{
    Task PublishAsync(INotificationMessage notification);
}