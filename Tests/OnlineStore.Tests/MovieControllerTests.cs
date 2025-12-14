using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Linq;
using OnlineStore.Controllers;
using OnlineStore.Repository;
using OnlineStore.Models;

namespace OnlineStore.Tests.Controllers
{
    [TestClass]
    public class MoviesControllerTests
    {
        [TestMethod]
        // Test to check that GetMovies returns OK when movies exist
        // and that the returned list contains the correct expected number of movies
        public void GetMovies_ReturnsOk()
        {
            // Arrange
            var repo = new Mock<IMovieRepository>();

            var movies = new List<Movie>
            {
                new Movie
                {
                    MovieId = 1,
                    Title = "Movie A",
                    Studio = "Test Studio",
                    Sku = "SKU-1",
                    Dimensions = "N/A",
                    Description = "Test movie A",
                    CoverImage = "ImageA"
                },
                new Movie
                {
                    MovieId = 2,
                    Title = "Movie B",
                    Studio = "Test Studio",
                    Sku = "SKU-2",
                    Dimensions = "N/A",
                    Description = "Test movie B",
                    CoverImage = "ImageB"
                }
            };

            repo.Setup(r => r.GetAllMovies()).Returns(movies);

            var controller = new MoviesController(repo.Object);

            // Act
            var result = controller.GetMovies();

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));

            var ok = (OkObjectResult)result.Result!;
            var returned = (IEnumerable<Movie>)ok.Value!;
            Assert.AreEqual(2, returned.Count());
        }

        // Test that verifies that GetMovie returns OK
        // when a movie with the given ID exists
        [TestMethod]
        public void GetMovie_ReturnsOk_WhenExists()
        {
            // Arrange
            var repo = new Mock<IMovieRepository>();

            var movie = new Movie
            {
                MovieId = 10,
                Title = "Existing Movie",
                Studio = "Test Studio",
                Sku = "SKU-10",
                Dimensions = "N/A",
                Description = "Test movie",
                CoverImage = "Image"
            };

            repo.Setup(r => r.GetMovieById(10)).Returns(movie);

            var controller = new MoviesController(repo.Object);

            // Act
            var result = controller.GetMovie(10);

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));

            var ok = (OkObjectResult)result.Result!;
            var returned = (Movie)ok.Value!;
            Assert.AreEqual(10, returned.MovieId);
        }

        // Test to check that GetMovie returns Not Found
        // when the requested movie does not exist
        [TestMethod]
        public void GetMovie_ReturnsNotFound_WhenMissing()
        {
            // Arrange
            var repo = new Mock<IMovieRepository>();
            repo.Setup(r => r.GetMovieById(999)).Returns((Movie?)null);

            var controller = new MoviesController(repo.Object);

            // Act
            var result = controller.GetMovie(999);

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(NotFoundResult));
        }

        // Test that verifies that GetMovieEverything returns OK
        // when detailed movie info exists
        [TestMethod]
        public void GetMovieEverything_ReturnsOk_WhenDetailsExist()
        {
            // Arrange
            var repo = new Mock<IMovieRepository>();

            var details = new List<MovieDetails>
            {
                new MovieDetails
                {
                    MovieId = 5,
                    Title = "Full Movie Info",
                    Sku = "SKU-5",
                    Description = "Test description",
                    CoverImage = "Image",
                    DirectorFirstName = "Test",
                    DirectorLastName = "Director",
                    CriticUsername = "TestCritic"
                }
            };

            repo.Setup(r => r.GetMovieEverything(5)).Returns(details);

            var controller = new MoviesController(repo.Object);

            // Act
            var result = controller.GetMovieEverything(5);

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));

            var ok = (OkObjectResult)result.Result!;
            var returned = (IEnumerable<MovieDetails>)ok.Value!;
            Assert.AreEqual(1, returned.Count());
        }

        // Test that checks that GetMovieEverything retuns Not Found
        // when no movie details are found
        [TestMethod]
        public void GetMovieEverything_ReturnsNotFound_WhenNoDetails()
        {
            // Arrange
            var repo = new Mock<IMovieRepository>();
            repo.Setup(r => r.GetMovieEverything(5)).Returns(Enumerable.Empty<MovieDetails>());

            var controller = new MoviesController(repo.Object);

            // Act
            var result = controller.GetMovieEverything(5);

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(NotFoundResult));
        }

        // Test that verifies that GetMovies returns a 500 error
        // when the repo throws an exception
        [TestMethod]
        public void GetMovies_Returns500_WhenRepoThrows()
        {
            // Arrange
            var repo = new Mock<IMovieRepository>();
            repo.Setup(r => r.GetAllMovies()).Throws(new System.Exception("DB error"));

            var controller = new MoviesController(repo.Object);

            // Act
            var result = controller.GetMovies();

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(ObjectResult));

            var obj = (ObjectResult)result.Result!;
            Assert.AreEqual(500, obj.StatusCode);
        }
    }
}
