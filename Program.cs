using CatalogoDeLivros;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=livros.db"));

var app = builder.Build();

app.MapGet("/catalogoDeLivros", () =>
{

});

app.MapPost("/catalogoDeLivros", () =>
{

});

app.MapPut("/catalogoDeLivros/{id}", (int id, string novoNome) =>
{

});

app.MapPatch("/catalogoDeLivros/{id}", (int id, string campo, string valor) =>
{

});

app.MapDelete("/catalogoDeLivros/{id}", (int id) =>
{

});

app.Run();
