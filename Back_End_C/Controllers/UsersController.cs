using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using OnlineStore.Repository;
using OnlineStore.Models;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly UserRepository _userRepo;
    private readonly IConfiguration _config;

    public UsersController(UserRepository userRepo, IConfiguration config)
    {
        _userRepo = userRepo;
        _config = config;
    }

    /**
     * Create a new user.
     *
     * Required fields:
     *  Username, PasswordHash
     *
     * POST /api/users
     */
    [HttpPost]
    public async Task<IActionResult> Register([FromBody] User newUser)
    {
        if (string.IsNullOrWhiteSpace(newUser.Username) || string.IsNullOrWhiteSpace(newUser.PasswordHash) || string.IsNullOrWhiteSpace(newUser.Email))
            return BadRequest(new { error = "Missing required fields" });
        if (await _userRepo.UsernameExistsAsync(newUser.Username))
            return BadRequest(new { error = "Username already exists" });
        if (await _userRepo.EmailExistsAsync(newUser.Email))
            return BadRequest(new { error = "Email already exists" });
        newUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newUser.PasswordHash, 10);
        var createdUser = await _userRepo.CreateUserAsync(newUser);
        await _userRepo.CreateCartForUserAsync(createdUser.UserId);
        createdUser.PasswordHash = null;
        return Created("", new { message = "User and cart created successfully", user = createdUser });
    }

    /**
     * Log in an existing user.
     *
     * This route checks the username and password, and if valid,
     * returns a signed JWT token that the front end will use for
     * authenticated requests.
     *
     * Important:
     *  Create your own .env file in the back_end_C folder
     *  and add the following line (with any value you choose):
     *
     *    JWT_KEY = yourvaluesgoeshere
     *
     *  Do not commit your .env file to git.
     *  Everyone will have their own local key.
     *  Your local JWT tokens only need to work on your own computer.
     *
     *  POST /api/users/login
     */
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            return BadRequest(new { error = "Missing required fields" });
        var user = await _userRepo.GetByEmailAsync(request.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return Unauthorized(new { error = "Invalid email or password" });
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not configured"));
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim("UserId", user.UserId.ToString()), new Claim("Username", user.Username) }),
            Expires = DateTime.UtcNow.AddHours(1),
            Issuer = "OnlineStore",
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);
        user.PasswordHash = null;
        return Ok(new { message = "Logged in successfully", token = tokenString, user });
    }

    /**
     * GET the logged in user
     * /api/user/me
     */
    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> GetMe()
    {
        var userId = int.Parse(User.FindFirstValue("UserId")!);
        var user = await _userRepo.GetByIdAsync(userId);
        if (user == null) return NotFound(new { error = "User not found" });
        user.PasswordHash = null;
        return Ok(user);
    }

    /**
     * GET the logged in user's cart
     * /api/user/me/carts
     */
    [Authorize]
    [HttpGet("me/carts")]
    public async Task<IActionResult> GetMyCarts()
    {
        var userId = int.Parse(User.FindFirstValue("UserId")!);
        var carts = await _userRepo.GetCartsForUserAsync(userId);
        return Ok(carts);
    }

    /**
     * GET a specific user's reviews
     * /api/user/me/reviews
     */
    [Authorize]
    [HttpGet("me/reviews")]
    public async Task<IActionResult> GetMyReviews()
    {
        var userId = int.Parse(User.FindFirstValue("UserId")!);
        var reviews = await _userRepo.GetReviewsByUserAsync(userId);
        return Ok(reviews);
    }

    /**
     * Update an existing user.
     *
     * All fields are optional, any field not provided will not be changed.
     *
     * PUT /api/users/me
     */
    [Authorize]
    [HttpPut("me")]
    public async Task<IActionResult> UpdateMe([FromBody] UpdateUserRequest request)
    {
        var userId = int.Parse(User.FindFirstValue("UserId")!);
        var updatedUser = await _userRepo.UpdateUserAsync(userId, request);
        if (updatedUser == null) return BadRequest(new { error = "No fields to update or username taken" });
        updatedUser.PasswordHash = null;
        return Ok(new { message = "User updated successfully", user = updatedUser });
    }

    /**
     * Delete a user and all related records besides reviews.
     *
     * This will set CriticId to NULL in all reviews made by the user.
     * 
     * This will remove:
     *  User's orders
     *  User's cart
     *  The user itself
     *
     * DELETE /api/users/me
     */
    [Authorize]
    [HttpDelete("me")]
    public async Task<IActionResult> DeleteMe()
    {
        var userId = int.Parse(User.FindFirstValue("UserId")!);
        var success = await _userRepo.DeleteUserAsync(userId);
        if (!success) return NotFound(new { error = "User not found" });
        return Ok(new { message = "User, cart, and all cart orders deleted successfully" });
    }
}

public class LoginRequest
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
}

public class UpdateUserRequest
{
    public string? Username { get; set; }
    public string? PasswordHash { get; set; }
    public string? Email { get; set; }
}