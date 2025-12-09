using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using System.IO;
using Back_End_C.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

// 🛑 FIX 1: Define a descriptive NAME for the policy, not the URL.
var MyAllowSpecificOrigins = "_myVitePolicy";
// You can remove the unused variable that previously held the URL: 
// var MyAllowSpecificOrigins = "http://localhost:5173"; // Removed/renamed

builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("Data/appsettings.json", optional: false, reloadOnChange: true);

var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY");
if (string.IsNullOrEmpty(jwtKey))
{
    throw new Exception("JWT_KEY not found in .env");
}
builder.Configuration["Jwt:Key"] = jwtKey;

string connString = builder.Configuration.GetConnectionString("DefaultConnection")!;

builder.Services.AddScoped<Back_End_C.Repository.UserRepository>(s => new Back_End_C.Repository.UserRepository(connString));
builder.Services.AddScoped<Back_End_C.Repository.MovieRepository>(s => new Back_End_C.Repository.MovieRepository(connString));

builder.Services.AddControllers();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
    };
});

builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
{
    // 🛑 FIX 2: Use the descriptive NAME here.
    options.AddPolicy(name: MyAllowSpecificOrigins,
                        policy =>
                        {
                            // 🛑 FIX 3: Include all necessary origins (Vite usually uses 5173)
                            policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                        });
});

var app = builder.Build();

// 🛑 FIX 4: Apply the policy using the descriptive NAME.
app.UseCors(MyAllowSpecificOrigins);

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();