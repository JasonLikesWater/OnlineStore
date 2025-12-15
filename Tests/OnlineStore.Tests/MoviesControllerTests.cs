using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Microsoft.AspNetCore.Mvc;
using OnlineStore.Controllers;
using OnlineStore.Repository;
using OnlineStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OnlineStore.Tests.Controllers
{
    [TestClass]
    public class MoviesControllerTests
    {
        private Mock<IMovieRepository> _mockRepository = null!;
        private MoviesController _controller = null!;

        [TestInitialize]
        public void Setup()
        {
            _mockRepository = new Mock<IMovieRepository>();
            _controller = new MoviesController(_mockRepository.Object);
        }

        // Test should return a list of movies
        [TestMethod]
        public void GetMovies_ReturnsOkResult_WithListOfMovies()
        {
            // Arrange
            var mockMovies = new List<Movie>
            {
                new Movie
                {
                    MovieId = 1,
                    Title = "Test Movie 1",
                    DirectorId = 1,
                    Studio = "Test Studio",
                    GenreId = 1,
                    Rating = 4.5,
                    Sku = "SKU001",
                    Price = 19.99m,
                    Weight = 0.5m,
                    Dimensions = "10x10x1",
                    Description = "Test Description",
                    CoverImage = "image1",
                    ReleaseDate = DateTime.Now
                },
                new Movie
                {
                    MovieId = 2,
                    Title = "Test Movie 2",
                    DirectorId = 2,
                    Studio = "Test Studio 2",
                    GenreId = 2,
                    Rating = 3.8,
                    Sku = "SKU002",
                    Price = 24.99m,
                    Weight = 0.6m,
                    Dimensions = "10x10x1",
                    Description = "Test Description 2",
                    CoverImage = "image2",
                    ReleaseDate = DateTime.Now
                }
            };

            _mockRepository.Setup(repo => repo.GetAllMovies()).Returns(mockMovies);

            // Act
            var result = _controller.GetMovies();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            
            var okResult = result.Result as OkObjectResult;
            var movies = okResult!.Value as IEnumerable<Movie>;
            
            Assert.IsNotNull(movies);
            Assert.AreEqual(2, movies!.Count());
        }

        // Test should return an empty list
        // when there are no movies
        [TestMethod]
        public void GetMovies_ReturnsOkResult_WithEmptyList_WhenNoMoviesExist()
        {
            // Arrange
            _mockRepository.Setup(repo => repo.GetAllMovies()).Returns(new List<Movie>());

            // Act
            var result = _controller.GetMovies();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            
            var okResult = result.Result as OkObjectResult;
            var movies = okResult!.Value as IEnumerable<Movie>;
            
            Assert.AreEqual(0, movies!.Count());
        }

        // Test should return error when somethings goes wrong
        [TestMethod]
        public void GetMovies_Returns500_WhenExceptionIsThrown()
        {
            // Arrange
            _mockRepository.Setup(repo => repo.GetAllMovies()).Throws(new Exception("Database connection failed"));

            // Act
            var result = _controller.GetMovies();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(ObjectResult));
            
            var statusCodeResult = result.Result as ObjectResult;
            Assert.AreEqual(500, statusCodeResult!.StatusCode);
            Assert.AreEqual("Failed to fetch movies from the database.", statusCodeResult.Value);
        }

        // Test should return a movie when given a valid ID
        [TestMethod]
        public void GetMovie_ReturnsOkResult_WithMovie_WhenMovieExists()
        {
            // Arrange
            int movieId = 1;
            var mockMovie = new Movie
            {
                MovieId = movieId,
                Title = "Test Movie",
                DirectorId = 1,
                Studio = "Test Studio",
                GenreId = 1,
                Rating = 4.5,
                Sku = "SKU001",
                Price = 19.99m,
                Weight = 0.5m,
                Dimensions = "10x10x1",
                Description = "Test Description",
                CoverImage = "image",
                ReleaseDate = DateTime.Now
            };

            _mockRepository.Setup(repo => repo.GetMovieById(movieId)).Returns(mockMovie);

            // Act
            var result = _controller.GetMovie(movieId);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            
            var okResult = result.Result as OkObjectResult;
            var movie = okResult!.Value as Movie;
            
            Assert.IsNotNull(movie);
            Assert.AreEqual(mockMovie.Title, movie!.Title);
            Assert.AreEqual(mockMovie.MovieId, movie.MovieId);
        }

        // Test returns not found when a movie is not found
        [TestMethod]
        public void GetMovie_ReturnsNotFound_WhenMovieDoesNotExist()
        {
            // Arrange
            int movieId = 999;
            _mockRepository.Setup(repo => repo.GetMovieById(movieId)).Returns((Movie?)null);

            // Act
            var result = _controller.GetMovie(movieId);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(NotFoundResult));
        }
        
        // Test should call the repo with the correct ID
        [TestMethod]
        public void GetMovie_CallsRepositoryWithCorrectId()
        {
            // Arrange
            int movieId = 5;
            _mockRepository.Setup(repo => repo.GetMovieById(movieId)).Returns((Movie?)null);

            // Act
            _controller.GetMovie(movieId);

            // Assert
            _mockRepository.Verify(repo => repo.GetMovieById(movieId), Times.Once);
        }

        // Test should return all movie details
        [TestMethod]
        public void GetMovieEverything_ReturnsOkResult_WithMovieDetails_WhenMovieExists()
        {
            // Arrange
            int movieId = 1;
            var mockMovieDetails = new List<MovieDetails>
            {
                new MovieDetails
                {
                    MovieId = movieId,
                    Title = "Test Movie",
                    Sku = "SKU001",
                    Price = 19.99m,
                    MovieRating = 4.5,
                    ReleaseDate = DateTime.Now,
                    Description = "Test Description",
                    CoverImage = "image",
                    DirectorFirstName = "John",
                    DirectorLastName = "Doe",
                    Genre = "Action",
                    CriticUsername = "critic1",
                    ReviewScore = 8.5,
                    ReviewDescription = "Great movie",
                    SaleDiscount = 0.1m,
                    SaleCategory = "Summer Sale"
                }
            };

            _mockRepository.Setup(repo => repo.GetMovieEverything(movieId)).Returns(mockMovieDetails);

            // Act
            var result = _controller.GetMovieEverything(movieId);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            
            var okResult = result.Result as OkObjectResult;
            var details = okResult!.Value as IEnumerable<MovieDetails>;
            
            Assert.IsNotNull(details);
            Assert.AreEqual(1, details!.Count());
        }

        // Test should return error when movie does not exist
        [TestMethod]
        public void GetMovieEverything_ReturnsNotFound_WhenMovieDoesNotExist()
        {
            // Arrange
            int movieId = 999;
            _mockRepository.Setup(repo => repo.GetMovieEverything(movieId)).Returns(new List<MovieDetails>());

            // Act
            var result = _controller.GetMovieEverything(movieId);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(NotFoundResult));
        }

        // Test should return error when no data is found
        [TestMethod]
        public void GetMovieEverything_ReturnsNotFound_WhenRepositoryReturnsNull()
        {
            // Arrange
            int movieId = 999;
            _mockRepository.Setup(repo => repo.GetMovieEverything(movieId)).Returns((IEnumerable<MovieDetails>)null!);

            // Act
            var result = _controller.GetMovieEverything(movieId);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(NotFoundResult));
        }

        // Test should return multiple records
        // for movies with many reviews
        [TestMethod]
        public void GetMovieEverything_ReturnsMultipleDetails_ForMovieWithMultipleReviews()
        {
            // Arrange
            int movieId = 1;
            var mockMovieDetails = new List<MovieDetails>
            {
                new MovieDetails
                {
                    MovieId = movieId,
                    Title = "Test Movie",
                    Sku = "SKU001",
                    Price = 19.99m,
                    MovieRating = 4.5,
                    ReleaseDate = DateTime.Now,
                    Description = "Test Description",
                    CoverImage = "image1",
                    DirectorFirstName = "John",
                    DirectorLastName = "Doe",
                    Genre = "Action",
                    CriticUsername = "critic1",
                    ReviewScore = 8.5,
                    ReviewDescription = "Great movie",
                    SaleDiscount = 0.1m,
                    SaleCategory = "Summer Sale"
                },
                new MovieDetails
                {
                    MovieId = movieId,
                    Title = "Test Movie",
                    Sku = "SKU001",
                    Price = 19.99m,
                    MovieRating = 4.5,
                    ReleaseDate = DateTime.Now,
                    Description = "Test Description",
                    CoverImage = "image2",
                    DirectorFirstName = "John",
                    DirectorLastName = "Doe",
                    Genre = "Action",
                    CriticUsername = "critic2",
                    ReviewScore = 9.0,
                    ReviewDescription = "Excellent movie",
                    SaleDiscount = 0.2m,
                    SaleCategory = "Winter Sale"
                }
            };

            _mockRepository.Setup(repo => repo.GetMovieEverything(movieId)).Returns(mockMovieDetails);

            // Act
            var result = _controller.GetMovieEverything(movieId);

            // Assert
            Assert.IsNotNull(result);
            var okResult = result.Result as OkObjectResult;
            var details = okResult!.Value as IEnumerable<MovieDetails>;
            
            Assert.AreEqual(2, details!.Count());
        }
    }
}