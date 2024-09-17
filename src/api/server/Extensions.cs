using System.Reflection;
using Asp.Versioning.Conventions;
using Carter;
using FluentValidation;
using SolanaSpin.WebApi.Catalog.Application;
using SolanaSpin.WebApi.Catalog.Infrastructure;
using SolanaSpin.WebApi.Todo;
using SolanaSpin.WebApi.Playground;

namespace SolanaSpin.WebApi.Host;

public static class Extensions
{
    public static WebApplicationBuilder RegisterModules(this WebApplicationBuilder builder)
    {
        ArgumentNullException.ThrowIfNull(builder);

        //define module assemblies
        var assemblies = new Assembly[]
        {
            typeof(CatalogMetadata).Assembly,
            typeof(TodoModule).Assembly,
            typeof(PlaygroundModule).Assembly,
        };

        //register validators
        builder.Services.AddValidatorsFromAssemblies(assemblies);

        //register mediatr
        builder.Services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssemblies(assemblies);
        });

        //register module services
        builder.RegisterCatalogServices();
        builder.RegisterTodoServices();
        builder.RegisterPlaygroundServices();

        //add carter endpoint modules
        builder.Services.AddCarter(configurator: config =>
        {
            config.WithModule<CatalogModule.Endpoints>();
            config.WithModule<TodoModule.Endpoints>();
            config.WithModule<PlaygroundModule.Endpoints>();
        });

        return builder;
    }

    public static WebApplication UseModules(this WebApplication app)
    {
        ArgumentNullException.ThrowIfNull(app);

        //register modules
        app.UseCatalogModule();
        app.UseTodoModule();
        app.UsePlaygroundModule();

        //register api versions
        var versions = app.NewApiVersionSet()
                    .HasApiVersion(1)
                    .HasApiVersion(2)
                    .ReportApiVersions()
                    .Build();

        //map versioned endpoint
        var endpoints = app.MapGroup("api/v{version:apiVersion}").WithApiVersionSet(versions);

        //use carter
        endpoints.MapCarter();

        return app;
    }
}
