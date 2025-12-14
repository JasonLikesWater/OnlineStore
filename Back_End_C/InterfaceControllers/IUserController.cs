using Microsoft.AspNetCore.Mvc;
using OnlineStore.Models;

public interface IUserController
{
    Task<IActionResult> Register([FromBody] User newUser);
    Task<IActionResult> Login([FromBody] LoginRequest request);
    Task<IActionResult> GetMe();
    Task<IActionResult> GetMyCarts();
    Task<IActionResult> GetMyReviews();
    Task<IActionResult> UpdateMe([FromBody] UpdateUserRequest request);
    Task<IActionResult> DeleteMe();
}