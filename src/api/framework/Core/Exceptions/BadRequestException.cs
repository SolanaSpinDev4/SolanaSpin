using System.Collections.ObjectModel;
using System.Net;

namespace FSH.Framework.Core.Exceptions;
public class BadRequestException : FshException
{
    public BadRequestException(string message)
        : base(message, new Collection<string>(), HttpStatusCode.BadRequest)
    {
    }
}
