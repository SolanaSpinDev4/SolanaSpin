using Finbuckle.MultiTenant;
using SolanaSpin.WebApi.Playground.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Text.Json;

namespace SolanaSpin.WebApi.Playground.Persistence.Configurations;
internal sealed class DiceConfiguration : IEntityTypeConfiguration<Dice>
{
    public void Configure(EntityTypeBuilder<Dice> builder)
    {
        var jsonSerializerOptions = new JsonSerializerOptions();

        builder.IsMultiTenant();
        builder.HasKey(x => x.Id);
        builder.HasIndex(x => x.Slug).IsUnique();
        builder.Property(x => x.Title).IsRequired().HasDefaultValue(string.Empty);
        builder.Property(x => x.Slug).IsRequired().HasDefaultValue(string.Empty);
        builder.Property(x => x.IsPubliclyPlayable).HasDefaultValue(false);
        builder.Property(x => x.Faces).IsRequired().HasConversion(
                x => JsonSerializer.Serialize(x, jsonSerializerOptions),
                x => JsonSerializer.Deserialize<IEnumerable<Face>>(x, jsonSerializerOptions) ?? Enumerable.Empty<Face>());
    }
}
