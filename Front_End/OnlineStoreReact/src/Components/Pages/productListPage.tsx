import { useState, useEffect } from "react";
import axios from "axios";
import { type Movie } from "../../interfaces.ts";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/movies";

function DetailsPage() {
  // Note: You might want to rename this component to ProductListPage
  // State Initialization
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Data Fetching Hook
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get<Movie[]>(API_URL);
        setMovies(response.data);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err) && err.message) {
          setError(`Failed to fetch movies: ${err.message}.`);
        } else {
          setError("An unknown network error occurred.");
        }
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Conditional Rendering (Loading/Error States) ---
  if (loading) {
    return (
      <div className="container mt-5">
        <h2>Loading Movie Inventory...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 alert alert-danger">
        <h2>Error Connecting to Server</h2>
        <p>{error}</p>
        <p>
          **Troubleshooting Tip:** Ensure your server is running on the correct
          port (e.g., 5000) and the route (`/api/movies`) is available.
        </p>
      </div>
    );
  }
  return (
    <div>
      <div className="tile-pattern">
        <div className="tile-3"></div>
      </div>
      <div className="container text-light">
        <h1 className="my-4 catalog-header">Movie Catalog</h1>

        {movies.length === 0 ? (
          <div className="alert alert-info mt-4">
            No movies were found in the database.
          </div>
        ) : (
          // Bootstrap grid structure for the movie cards
          <div className="row row-cols-1 row-cols-md-3 g-4 mx-5 mb-5">
            {/* Loop through the fetched movies array and generate a card for each */}

            {movies.map((movie) => (
              // 🚀 FIX 1: The key prop must be on the outermost element of the map function, which is the <Link>.
              <Link
                key={movie.movieId} // <-- Key moved here
                to={`/Pages/productDetailsPage/${movie.movieId}`}
                className="card-link-wrapper text-decoration-none"
              >
                {/* Removed the key from the <div> element */}
                <div className="col">
                  <div className="card h-100 shadow-sm movie-card">
                    <img
                      src={movie.coverImage}
                      className="card-img-top"
                      style={{ maxHeight: "450px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text mb-1">
                        {movie.studio}
                        <br />
                        Rating: {movie.rating}/10
                      </p>
                      <p className="card-text text-success fw-bold">
                        Price: ${movie.price?.toFixed(2) ?? "N/A"}
                      </p>
                      <p className="card-text text-muted small">
                        Released:{" "}
                        {new Date(movie.releaseDate).toLocaleDateString()}
                      </p>

                      {/* 🛠️ FIX 2: Replaced the nested <a> with a <button> tag. 
                          This resolves the "<a> cannot be a descendant of <a>" error. */}
                      <button
                        type="button" // Use type="button" for clarity
                        onClick={(e) => {
                          // Stop propagation prevents the click from triggering the parent <Link> navigation
                          e.stopPropagation();
                        }}
                        className="btn btn-outline-light me-2 align-items-center"
                      >
                        <MdOutlineAddShoppingCart className="me-1" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailsPage;
