using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using OnlineStore.Models;
using System.Threading.Tasks;

namespace OnlineStore.Tests.Controllers
{
    [TestClass]
    public class UsersControllerTests
    {
        private Mock<IUserRepository> _mockRepository = null!;
        private Mock<IConfiguration> _mockConfiguration = null!;
        private UsersController _controller = null!;

        [TestInitialize]
        public void Setup()
        {
            _mockRepository = new Mock<IUserRepository>();
            _mockConfiguration = new Mock<IConfiguration>();
            
            _mockConfiguration.Setup(c => c["Jwt:Key"]).Returns("test-secret-key-for-jwt-token-minimum-32-characters");
            
            _controller = new UsersController(_mockRepository.Object, _mockConfiguration.Object);
        }

        // Test that should create a new user successfully with the valid info
        [TestMethod]
        public async Task Register_ReturnsCreated_WhenUserIsValid()
        {
            // Arrange
            var newUser = new User
            {
                Username = "testuser",
                PasswordHash = "password123",
                Email = "test@example.com"
            };

            var createdUser = new User
            {
                UserId = 1,
                Username = "testuser",
                PasswordHash = "hashedpassword",
                Email = "test@example.com"
            };

            _mockRepository.Setup(repo => repo.UsernameExistsAsync(newUser.Username)).ReturnsAsync(false);
            _mockRepository.Setup(repo => repo.EmailExistsAsync(newUser.Email)).ReturnsAsync(false);
            _mockRepository.Setup(repo => repo.CreateUserAsync(It.IsAny<User>())).ReturnsAsync(createdUser);
            _mockRepository.Setup(repo => repo.CreateCartForUserAsync(createdUser.UserId)).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.Register(newUser);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(CreatedResult));
        }

        // Test should return error when username is already taken or exists
        [TestMethod]
        public async Task Register_ReturnsBadRequest_WhenUsernameAlreadyExists()
        {
            // Arrange
            var newUser = new User
            {
                Username = "existinguser",
                PasswordHash = "password123",
                Email = "new@example.com"
            };

            _mockRepository.Setup(repo => repo.UsernameExistsAsync(newUser.Username)).ReturnsAsync(true);

            // Act
            var result = await _controller.Register(newUser);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        // Test should return error when the required fields are missing
        [TestMethod]
        public async Task Register_ReturnsBadRequest_WhenRequiredFieldsMissing()
        {
            // Arrange
            var newUser = new User
            {
                Username = "",
                PasswordHash = "password123",
                Email = "test@example.com"
            };

            // Act
            var result = await _controller.Register(newUser);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        // Test that a user can login with the correct email and password
        [TestMethod]
        public async Task Login_ReturnsOk_WhenCredentialsAreValid()
        {
            // Arrange
            var loginRequest = new LoginRequest
            {
                Email = "test@example.com",
                Password = "password123"
            };

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword("password123", 10);
            var user = new User
            {
                UserId = 1,
                Username = "testuser",
                PasswordHash = hashedPassword,
                Email = "test@example.com"
            };

            _mockRepository.Setup(repo => repo.GetByEmailAsync(loginRequest.Email)).ReturnsAsync(user);

            // Act
            var result = await _controller.Login(loginRequest);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        // Test that login fails when the password is incorrect
        [TestMethod]
        public async Task Login_ReturnsUnauthorized_WhenCredentialsAreInvalid()
        {
            // Arrange
            var loginRequest = new LoginRequest
            {
                Email = "test@example.com",
                Password = "wrongpassword"
            };

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword("correctpassword", 10);
            var user = new User
            {
                UserId = 1,
                Username = "testuser",
                PasswordHash = hashedPassword,
                Email = "test@example.com"
            };

            _mockRepository.Setup(repo => repo.GetByEmailAsync(loginRequest.Email)).ReturnsAsync(user);

            // Act
            var result = await _controller.Login(loginRequest);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(UnauthorizedObjectResult));
        }
    }
}