import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { MdOutlineAddShoppingCart } from "react-icons/md";
// Assuming MovieDetails is the correct type for both pages, or is compatible with Movie
import { type MovieDetails } from "../../interfaces";

// Define your API constants clearly
const BASE_API_URL = "http://localhost:5000/api";
const SEARCH_API_URL = `${BASE_API_URL}/movies/search`;
const CART_API_URL = `${BASE_API_URL}/users/me/carts`;

const SearchResultsPage = () => {
  // 1. State and URL Hooks
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [results, setResults] = useState<MovieDetails[]>([]); // Using 'results' state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Needed for handleAddToCart and login redirection

  // 2. Add to Cart Function (Copied and adapted from DetailsPage)
  const handleAddToCart = async (movie: MovieDetails) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/Pages/loginPage");
      return;
    }
    if (!movie || !movie.movieId) return;

    try {
      const response = await fetch(CART_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId: movie.movieId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Cart API Error: HTTP Status ${response.status}`,
          errorText
        );
        throw new Error(
          `Failed to add movie to cart. Server status: ${response.status}.`
        );
      }

      alert(`Successfully added "${movie.title}" to your cart!`);
    } catch (err) {
      console.error("Add to cart error:", err);
      alert(`Failed to add "${movie.title}" to cart.`);
    }
  };

  // 3. Data Fetching Hook
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const url = `${SEARCH_API_URL}?title=${encodeURIComponent(query)}`;
        const response = await fetch(url);

        if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status}. Details: ${errorDetails}`
          );
        }

        const data: MovieDetails[] = await response.json();
        setResults(data);
      } catch (err: any) {
        console.error("Search fetch failed:", err);
        setError(`Failed to fetch results. ${err.message}`);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  // 4. Conditional Rendering (Matches DetailsPage logic)
  if (isLoading) {
    return (
      <div className="container mt-5 text-light">
        <h2>Searching for movies...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 alert alert-danger">
        <h2>Search Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  // 5. Render Results (Matches DetailsPage structure)
  return (
    <div>
      <div className="tile-pattern">
        <div className="tile-3"></div>
      </div>
      <div className="container text-light">
        <h1 className="my-4 catalog-header">Search Results for: "{query}"</h1>

        {results.length === 0 ? (
          <div className="alert alert-info mt-4">
            No movies were found matching **"{query}"** in the database.
          </div>
        ) : (
          // Bootstrap grid structure for the movie cards
          // Note: Removed the 'mx-5 mb-5' classes for better alignment in a general search container
          <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
            {/* Loop through the fetched results array */}
            {results.map((movie) => (
              <Link
                key={movie.movieId}
                to={`/Pages/productDetailsPage/${movie.movieId}`}
                className="card-link-wrapper text-decoration-none"
              >
                <div className="col">
                  <div className="card h-100 shadow-sm movie-card">
                    <img
                      src={movie.coverImage}
                      className="card-img-top"
                      style={{ maxHeight: "450px", objectFit: "cover" }}
                      alt={movie.title}
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

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(movie);
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
};

export default SearchResultsPage;
