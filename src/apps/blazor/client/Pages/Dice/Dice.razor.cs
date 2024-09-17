using SolanaSpin.Blazor.Client.Components.EntityTable;
using SolanaSpin.Blazor.Infrastructure.Api;
using SolanaSpin.Blazor.Shared;
using Mapster;
using Microsoft.AspNetCore.Components;

namespace SolanaSpin.Blazor.Client.Pages.Dice;

public partial class Dice
{
    [Inject]
    protected IApiClient ApiClient { get; set; } = default!;

    protected EntityServerTableContext<DiceDto, Guid, UpdateDiceCommand> Context { get; set; } = default!;

    private EntityTable<DiceDto, Guid, UpdateDiceCommand> _table = default!;

    protected override void OnInitialized() =>
        Context = new(
            entityName: "Dice",
            entityNamePlural: "Dice",
            entityResource: FshResources.Dice,
            fields: new()
            {
                new(prod => prod.Id, "Id", "Id"),
                new(prod => prod.Title, "Title", "Title"),
                new(prod => prod.Slug, "Slug", "Slug"),
                new(prod => prod.IsPubliclyPlayable, "Is Publicly Playable", "Is Publicly Playable"),
                new(prod => prod.MinimumPlayAmount, "Minimum Play Amount", "Minimum Play Amount"),
                new(prod => prod.MaximumPlayAmount, "Maximum Play Amount", "Maximum Play Amount"),
            },
            enableAdvancedSearch: false,
            idFunc: prod => prod.Id,
            searchFunc: async filter =>
            {
                var diceFilter = filter.Adapt<PaginationFilter>();

                var result = await ApiClient.GetDiceListEndpointAsync("1", diceFilter);
                return result.Adapt<PaginationResponse<DiceDto>>();
            },
            createFunc: async item =>
            {
                await ApiClient.CreateDiceEndpointAsync("1", item.Adapt<CreateDiceCommand>());
            },
            updateFunc: async (id, item) =>
            {
                await ApiClient.UpdateDiceEndpointAsync("1", id, item.Adapt<UpdateDiceCommand>());
            },
            deleteFunc: async id => await ApiClient.DeleteDiceEndpointAsync("1", id));
}
