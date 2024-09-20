using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.PlayDice;
public record PlayDiceResult(
    DiceDto Dice,
    int FaceIndex,
    decimal ReturnAmount,
    PlayDiceResult? InnerResult = null)
{
    public Face Face => Dice.Faces.ElementAt(FaceIndex);
    public FaceResultType ResultType => Face.ResultType;
    public string? ResultValue => Face.ResultValue;

    public decimal GetNetAmount(decimal playAmount)
    {
        return playAmount - ReturnAmount + (InnerResult?.GetNetAmount(playAmount) ?? 0);
    }
}
public record PlayDiceResponse(
    PlayDiceRequest Request,
    PlayDiceResult Result)
{
    public decimal NetAmount => Result.GetNetAmount(Request.PlayAmount);
}
