using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using OnlineStore.Repository;
using OnlineStore.Models;

namespace OnlineStore.Tests.Controllers
{
    [TestClass]
    public class UsersControllerTests
    {
        private Mock<IUserRepository> _repoMock = null!;
        private IConfiguration _config = null!;

        // Setup method runs before each test
        [TestInitialize]
        public void Setup()
        {
            // Arrange to create fresh mock and config for each test
            _repoMock = new Mock<IUserRepository>();
            
            _config = new ConfigurationBuilder()
                .AddInMemoryCollection(new Dictionary<string, string?>
                {
                    ["Jwt:Key"] = "TestKeyForJWT_TestKeyForJWT_TestKeyForJWT"
                })
                .Build();
        }

        // Helper method to create a controller for testing
        private UsersController CreateController(int? userId = null)
        {
            var controller = new UsersController(_repoMock.Object, _config);

            if (userId != null)
            {
                var claims = new Claim[]
                {
                    new Claim("UserId", userId.Value.ToString()),
                    new Claim("Username", "testuser")
                };

                var identity = new ClaimsIdentity(claims, "TestAuth");
                var user = new ClaimsPrincipal(identity);

                controller.ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext { User = user }
                };
            }

            return controller;
        }

        // (Register Tests)
        // Test to make sure username is not empty

        [TestMethod]
        public async Task Register_EmptyUsername_ReturnsBadRequest()
        {
            // Arrange
            var controller = CreateController();
            var newUser = new User 
            { 
                Username = "",
                PasswordHash = "password123", 
                Email = "test@email.com" 
            };

            // Act
            var result = await controller.Register(newUser);

            // Assert
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        // Test to check that a username must be unique
        // also so that two people can't have the same username
        [TestMethod]
        public async Task Register_UsernameAlreadyExists_ReturnsBadRequest()
        {
            // Arrange
            _repoMock.Setup(r => r.UsernameExistsAsync("john")).ReturnsAsync(true);
            
            var controller = CreateController();
            var newUser = new User 
            { 
                Username = "john", 
                PasswordHash = "password123", 
                Email = "john@email.com" 
            };

            // Act
            var result = await controller.Register(newUser);

            // Assert
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        // Test to check that emails must be unique
        [TestMethod]
        public async Task Register_EmailAlreadyExists_ReturnsBadRequest()
        {
            // Arrange
            _repoMock.Setup(r => r.UsernameExistsAsync("john")).ReturnsAsync(false);
            _repoMock.Setup(r => r.EmailExistsAsync("john@email.com")).ReturnsAsync(true);
            
            var controller = CreateController();
            var newUser = new User 
            { 
                Username = "john", 
                PasswordHash = "password123", 
                Email = "john@email.com" 
            };

            // Act
            var result = await controller.Register(newUser);

            // Assert
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        // Test to make sure a new user can sign up
        [TestMethod]
        public async Task Register_ValidUser_ReturnsCreated()
        {
            // Arrange
            _repoMock.Setup(r => r.UsernameExistsAsync("john")).ReturnsAsync(false);
            _repoMock.Setup(r => r.EmailExistsAsync("john@email.com")).ReturnsAsync(false);
            _repoMock.Setup(r => r.CreateUserAsync(It.IsAny<User>()))
                .ReturnsAsync(new User
                {
                    UserId = 1,
                    Username = "john",
                    PasswordHash = "hashed",
                    Email = "john@email.com"
                });
            _repoMock.Setup(r => r.CreateCartForUserAsync(1)).Returns(Task.CompletedTask);

            var controller = CreateController();
            var newUser = new User 
            { 
                Username = "john", 
                PasswordHash = "password123", 
                Email = "john@email.com" 
            };

            // Act
            var result = await controller.Register(newUser);

            // Assert
            Assert.IsInstanceOfType(result, typeof(CreatedResult));
        }

        // (Login Tests)
        // Test to make sure an email is required to login

        [TestMethod]
        public async Task Login_EmptyEmail_ReturnsBadRequest()
        {
            // Arrange
            var controller = CreateController();
            var login = new LoginRequest { Email = "", Password = "password123" };

            // Act
            var result = await controller.Login(login);

            // Assert
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        // Test to make sure a password is required to login
        [TestMethod]
        public async Task Login_EmptyPassword_ReturnsBadRequest()
        {
            // Arrange
            var controller = CreateController();
            var login = new LoginRequest { Email = "user@email.com", Password = "" };

            // Act
            var result = await controller.Login(login);

            // Assert
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        // Test to make sure that the login fails
        // with a incorrect password
        [TestMethod]
        public async Task Login_WrongPassword_ReturnsUnauthorized()
        {
            // Arrange
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword("correctpassword", 10);
            _repoMock.Setup(r => r.GetByEmailAsync("user@email.com"))
                .ReturnsAsync(new User 
                { 
                    UserId = 1, 
                    Username = "user", 
                    Email = "user@email.com", 
                    PasswordHash = hashedPassword 
                });

            var controller = CreateController();
            var login = new LoginRequest 
            { 
                Email = "user@email.com", 
                Password = "wrongpassword" 
            };

            // Act
            var result = await controller.Login(login);

            // Assert
            Assert.IsInstanceOfType(result, typeof(UnauthorizedObjectResult));
        }

        // Test to check that login works with correct password
        [TestMethod]
        public async Task Login_CorrectCredentials_ReturnsOk()
        {
            // Arrange
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword("password123", 10);
            _repoMock.Setup(r => r.GetByEmailAsync("user@email.com"))
                .ReturnsAsync(new User 
                { 
                    UserId = 1, 
                    Username = "user", 
                    Email = "user@email.com", 
                    PasswordHash = hashedPassword 
                });

            var controller = CreateController();
            var login = new LoginRequest 
            { 
                Email = "user@email.com", 
                Password = "password123" 
            };

            // Act
            var result = await controller.Login(login);

            // Assert
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        // (Get Tests)
        // Test to check that you can't get info for
        // a user that does not exist

        [TestMethod]
        public async Task GetMe_UserNotFound_ReturnsNotFound()
        {
            // Arrange
            _repoMock.Setup(r => r.GetByIdAsync(5)).ReturnsAsync((User?)null);
            var controller = CreateController(userId: 5);

            // Act
            var result = await controller.GetMe();

            // Assert
            Assert.IsInstanceOfType(result, typeof(NotFoundObjectResult));
        }

        // (Cart Tests)
        // Test to check that the movie ID can not be zero

        [TestMethod]
        public async Task AddToCart_ZeroMovieId_ReturnsBadRequest()
        {
            // Arrange
            var controller = CreateController(userId: 3);
            var request = new AddToCartRequest { MovieId = 0 };

            // Act
            var result = await controller.AddToCart(request);

            // Assert
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        // Test to make sure that movie ID is positive
        [TestMethod]
        public async Task AddToCart_NegativeMovieId_ReturnsBadRequest()
        {
            // Arrange
            var controller = CreateController(userId: 3);
            var request = new AddToCartRequest { MovieId = -1 };

            // Act
            var result = await controller.AddToCart(request);

            // Assert
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        // Test to make sure that it fails when order ID is invalid
        [TestMethod]
        public async Task RemoveFromCart_OrderNotFound_ReturnsNotFound()
        {
            // Arrange
            _repoMock.Setup(r => r.RemoveOrderFromCartAsync(3, 99)).ReturnsAsync(false);
            var controller = CreateController(userId: 3);

            // Act
            var result = await controller.RemoveFromCart(99);

            // Assert
            Assert.IsInstanceOfType(result, typeof(NotFoundObjectResult));
        }
    }
}