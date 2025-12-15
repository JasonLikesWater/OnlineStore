using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using System.IO;
using OnlineStore.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

// 1. Policy Name Defined
var MyAllowSpecificOrigins = "_myVitePolicy";

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

builder.Services.AddScoped<OnlineStore.Repository.UserRepository>(s => new OnlineStore.Repository.UserRepository(connString));
builder.Services.AddScoped<OnlineStore.Repository.MovieRepository>(s => new OnlineStore.Repository.MovieRepository(connString));
builder.Services.AddScoped<IMovieRepository>(s => new MovieRepository(connString));
builder.Services.AddScoped<ISaleRepository, SaleRepository>();

builder.Services.AddControllers();

// 2. CORS Service Added
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                        policy =>
                        {
                            // Allowing common React/Vite development ports
                            policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                        });
});


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
    };
});

builder.Services.AddAuthorization();

var app = builder.Build();

// --- CRITICAL FIX: MIDDLEWARE ORDER IS CORRECTED HERE ---

// 3. CORS Middleware Applied (MUST be before UseAuthorization and MapControllers)
app.UseCors(MyAllowSpecificOrigins);

// UseRouting is generally placed before CORS, but after the use of app.UseStaticFiles() if applicable.
// If you are using endpoint routing (which MapControllers uses), UseRouting should be early.
app.UseRouting();

// Authentication and Authorization come after Routing and CORS
app.UseAuthentication();
app.UseAuthorization();

// MapControllers is the final step that executes the endpoint logic
app.MapControllers();

app.Run();