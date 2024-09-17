using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.Play.v1;
public record PlayDiceResult(
    DiceDto Dice,
    int FaceIndex,
    decimal ReturnAmount,
    PlayDiceResult? InnerResult = null)
{
    public Face Face => Dice.Faces.ElementAt(FaceIndex);
    public FaceResultType ResultType => Face.ResultType;
    public string? ResultValue => Face.ResultValue;
}
public record PlayDiceResponse(
    PlayDiceRequest Request,
    PlayDiceResult Result);
