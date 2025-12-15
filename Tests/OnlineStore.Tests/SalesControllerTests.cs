using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Microsoft.AspNetCore.Mvc;
using OnlineStore.Controllers;
using OnlineStore.Repository;
using OnlineStore.Models;
using System.Collections.Generic;

namespace OnlineStore.Tests.Controllers
{
    [TestClass]
    public class SalesControllerTests
    {
        private Mock<ISaleRepository> _mockRepository = null!;
        private SalesController _controller = null!;

        [TestInitialize]
        public void Setup()
        {
            _mockRepository = new Mock<ISaleRepository>();
            _controller = new SalesController(_mockRepository.Object);
        }

        // Test should return all active sales
        [TestMethod]
        public void GetActiveSales_ReturnsOkResult_WithListOfActiveSales()
        {
            // Arrange
            var mockSales = new List<Sale>
            {
                new Sale(1, 0.15, "2024-12-01", "2024-12-31", "Holiday"),
                new Sale(2, 0.20, "2024-12-10", "2024-12-25", "Winter")
            };

            _mockRepository.Setup(repo => repo.GetActiveSales()).Returns(mockSales);

            // Act
            var result = _controller.GetActiveSales();

            // Assert
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var sales = okResult.Value as List<Sale>;
            Assert.IsNotNull(sales);
            Assert.HasCount(2, sales);
        }

        // Test should return sales that match the given category
        [TestMethod]
        public void GetSalesByCategory_ReturnsOkResult_WithSalesForCategory()
        {
            // Arrange
            string category = "Holiday";
            var mockSales = new List<Sale>
            {
                new Sale(1, 0.15, "2024-12-01", "2024-12-31", "Holiday")
            };

            _mockRepository.Setup(repo => repo.GetSaleByCategory(category)).Returns(mockSales);

            // Act
            var result = _controller.GetSalesByCategory(category);

            // Assert
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var sales = okResult.Value as List<Sale>;
            Assert.IsNotNull(sales);
            Assert.HasCount(1, sales);
            Assert.AreEqual("Holiday", sales[0].Category);
        }

        // Test should return sale with the matching ID
        [TestMethod]
        public void GetSaleById_ReturnsOkResult_WhenSaleExists()
        {
            // Arrange
            int saleId = 1;
            var mockSale = new Sale(saleId, 0.15, "2024-12-01", "2024-12-31", "Holiday");

            _mockRepository.Setup(repo => repo.GetSaleByID(saleId)).Returns(mockSale);

            // Act
            var result = _controller.GetSaleById(saleId);

            // Assert
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var sale = okResult.Value as Sale;
            Assert.IsNotNull(sale);
            Assert.AreEqual(saleId, sale.SaleId);
        }

        // Test should return not found when the sale does not exist
        [TestMethod]
        public void GetSaleById_ReturnsNotFound_WhenSaleDoesNotExist()
        {
            // Arrange
            int saleId = 999;
            _mockRepository.Setup(repo => repo.GetSaleByID(saleId)).Returns((Sale)null!);

            // Act
            var result = _controller.GetSaleById(saleId);

            // Assert
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        // Test should return all active movie sales
        [TestMethod]
        public void GetActiveMovieSales_ReturnsOkResult_WithListOfMovieSales()
        {
            // Arrange
            var mockMovieSales = new List<MovieSale>
            {
                new MovieSale { MovieId = 1, SaleId = 1 },
                new MovieSale { MovieId = 2, SaleId = 1 },
                new MovieSale { MovieId = 3, SaleId = 2 }
            };

            _mockRepository.Setup(repo => repo.GetActiveMovieSales()).Returns(mockMovieSales);

            // Act
            var result = _controller.GetActiveMovieSales();

            // Assert
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var movieSales = okResult.Value as List<MovieSale>;
            Assert.IsNotNull(movieSales);
            Assert.HasCount(3, movieSales);
        }
    }
}
