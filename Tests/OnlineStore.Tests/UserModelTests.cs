using Microsoft.VisualStudio.TestTools.UnitTesting;
using OnlineStore.Models;

namespace OnlineStore.Tests.Models
{
    [TestClass]
    public class UserModelTests
    {
        // Checks to see that a new user object starts with
        // the correct default vaules.
        [TestMethod]
        public void User_DefaultValues_AreExpected()
        {
            // Arrange
            User user = new User();

            // Act & Assert
            Assert.AreEqual(0, user.UserId, "Default UserId should be 0.");
            Assert.AreEqual("", user.Username, "Default Username should be empty string.");
            Assert.IsNull(user.PasswordHash, "Default PasswordHash should be null.");
            Assert.IsNull(user.Email, "Default Email should be null.");
        }

        // Tests to make sure the user model's properties
        // can be set correctly

        [TestMethod]
        public void User_Properties_CanBeSet_AndReadBack()
        {
            // Arrange
            User user = new User();

            // Act
            user.UserId = 5;
            user.Username = "John";
            user.PasswordHash = "Password123";
            user.Email = "JohnCena@example.com";

            // Assert
            Assert.AreEqual(5, user.UserId);
            Assert.AreEqual("John", user.Username);
            Assert.AreEqual("Password123", user.PasswordHash);
            Assert.AreEqual("JohnCena@example.com", user.Email);
        }

        // Checks to see that the nullale fields accept the null values
        [TestMethod]
        public void User_AllowsNullPasswordAndEmail()
        {
            // Arrange
            User user = new User
            {
                UserId = 1,
                Username = "Bobby",
                PasswordHash = null,
                Email = null
            };

            // Act & Assert
            Assert.AreEqual(1, user.UserId);
            Assert.AreEqual("Bobby", user.Username);
            Assert.IsNull(user.PasswordHash);
            Assert.IsNull(user.Email);
        }
    }
}
