using Finbuckle.MultiTenant;
using SolanaSpin.WebApi.Playground.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SolanaSpin.WebApi.Playground.Persistence.Configurations;
internal sealed class JackpotConfiguration : IEntityTypeConfiguration<Jackpot>
{
    public void Configure(EntityTypeBuilder<Jackpot> builder)
    {
        builder.IsMultiTenant();
        builder.HasKey(x => x.Id);
        builder.HasIndex(x => x.Slug).IsUnique();
        builder.Property(x => x.Title).IsRequired().HasDefaultValue(string.Empty);
        builder.Property(x => x.Slug).IsRequired().HasDefaultValue(string.Empty);
        builder.Property(x => x.IsEnabled).HasDefaultValue(false);
        builder.Property(x => x.CurrentAmount).HasDefaultValue(0);
        builder.Property(x => x.LimitAmount).HasDefaultValue(0);
        builder.Property(x => x.CollectPercentage).HasDefaultValue(0);
    }
}
