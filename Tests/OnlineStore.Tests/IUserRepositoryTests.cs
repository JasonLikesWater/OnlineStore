using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Online_Store.Models;

namespace OnlineStore.Tests
{
    [TestClass]
    public class IUserRepositoryTests
    {
        // Testing when a user is found correctly
        [TestMethod]
        public void GetUserById_WithValidId_ReturnsCorrectUser()
        {
            // Arrange
            var mockRepo = new Mock<IUserRepository>();

            var expectedUser = new User(1,"Name123","password123");

            mockRepo.Setup(r => r.GetUserById(1)).Returns(expectedUser);

            // Act
            var result = mockRepo.Object.GetUserById(1);

            // Assert 
            Assert.AreEqual(expectedUser.UserId, result.UserId, "The userId does not match");
            Assert.AreEqual(expectedUser.Username, result.Username, "The username does not match");
            Assert.AreEqual(expectedUser.PasswordHash, result.PasswordHash, "The passwordHash does not match");
        }


        // Testing when a user is not found
        [TestMethod]
        public void GetUserById_WithInvalidId_ReturnsNull()
        {
            // Arrange
            var mockRepo = new Mock<IUserRepository>();

            mockRepo.Setup(r => r.GetUserById(100)).Returns((User)null!);
            
            // Act
            var result = mockRepo.Object.GetUserById(100);

            // Assert
            Assert.IsNull(result, "Expected null when user is not found");
        }
    }
}
