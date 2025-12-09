using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using System.IO;
using Back_End_C.Repository;

var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("Data/appsettings.json", optional: false, reloadOnChange: true);

string connString = builder.Configuration.GetConnectionString("DefaultConnection")!;

builder.Services.AddScoped<Back_End_C.Repository.UserRepository>(s => new Back_End_C.Repository.UserRepository(connString));
builder.Services.AddScoped<Back_End_C.Repository.MovieRepository>(s => new Back_End_C.Repository.MovieRepository(connString));

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                        policy =>
                        {
                            policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                        });
});

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);
app.UseRouting();
app.MapControllers();

app.Run();