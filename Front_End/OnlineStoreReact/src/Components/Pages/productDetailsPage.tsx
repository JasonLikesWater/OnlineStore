import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { type MovieDetails, type DetailParams } from "../../interfaces";
import { MdOutlineAddShoppingCart } from "react-icons/md";

var API_URL = "http://localhost:5000/api";

// --- Data Fetching Function (FIXED to extract element from array) ---
async function fetchMovieById(
  id: string,
  signal?: AbortSignal
): Promise<MovieDetails> {
  var url = `${API_URL}/movies/${id}/everything`;
  var response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch movie details. Status: ${response.status}`
    );
  }

  // 1. We now explicitly declare the expected response type as an array
  var dataArray: MovieDetails[] = await response.json();

  // 2. Check if the array has data and return the first element
  if (dataArray && dataArray.length > 0) {
    return dataArray[0]; // Returns the single MovieDetails object
  } else {
    // 3. Handle the scenario where the API returns a 200 OK status but an empty array
    throw new Error(`Product details not found for ID: ${id}`);
  }
}
// ------------------------------------------

function ProductDetailsPage(): React.ReactElement {
  var { productId } = useParams<DetailParams>();
  var [movie, setMovie] = useState<MovieDetails | null>(null);
  var [isLoading, setIsLoading] = useState(true);
  var [error, setError] = useState<string | null>(null);

  // Data Fetching Effect (With AbortController for cleanup) - Kept as is
  useEffect(() => {
    if (productId) {
      const controller = new AbortController();
      const signal = controller.signal;

      setIsLoading(true);
      setError(null);

      // fetchMovieById now returns the single object, so `data` is `MovieDetails`
      fetchMovieById(productId, signal)
        .then(function (data) {
          setMovie(data);
        })
        .catch(function (err) {
          if (err.name === "AbortError") return;

          console.error("Fetch error:", err);
          // Catching the error thrown by fetchMovieById for empty array
          setError(err.message || "An unknown error occurred during fetch.");
        })
        .finally(function () {
          if (!signal.aborted) {
            setIsLoading(false);
          }
        });

      return () => {
        controller.abort();
      };
    }
  }, [productId]);

  // --- Loading, Error, Not Found States (Kept clean) ---
  if (isLoading) {
    return (
      <div className="container mx-auto p-8 lg:p-12 text-center">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">
          Loading product details for ID: {productId}...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 lg:p-12">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mx-auto p-8 lg:p-12 text-center">
        <p className="text-xl font-semibold text-gray-700">
          Product details not found for ID: {productId}
        </p>
      </div>
    );
  }

  // --- Main Product Display (Modern Look) ---

  const originalRating = movie.movieRating || 0;
  const normalizedRating = originalRating / 2; // Normalized to 5-star scale (e.g., 9.0/2 = 4.5)

  // Helper for displaying a formatted price (assuming 'price' exists on 'Movie')
  // NOTE: You may want to check if movie.price is null/undefined if it's optional in MovieDetails
  const formattedPrice = movie.price
    ? `$${movie.price.toFixed(2)}`
    : "Price Unavailable";

  const formattedReleaseDate = movie.releaseDate
    ? movie.releaseDate.substring(0, 10)
    : "Date Unavailable";

  // Helper for displaying stars (using 5-star scale)
  const StarRating = ({ rating }: { rating: number }) => {
    // `rating` is the prop passed to the component
    const stars = Array(5)
      .fill(null)
      .map((_, i) => {
        const starIndex = i + 1;
        let starType = "star-empty"; // Default to empty

        // CORRECTED: Use the prop `rating` here
        if (starIndex <= rating) {
          starType = "star-filled"; // Full star
        } else if (starIndex - 0.5 <= rating) {
          starType = "star-half"; // Half star
        }

        // Use conditional rendering for the symbol based on the starType
        // NOTE: If you are using Font Awesome or a specific CSS library,
        // you would typically use classes here (e.g., `<i class="fa-star-half">`)
        const symbol = starType === "star-half" ? "★" : "★"; // Simple symbol is fine for now

        return (
          <span key={i} className={`star ${starType}`}>
            {symbol}
          </span>
        );
      });

    return (
      <div className="star-rating-container">
        {stars}
        <span className="rating-score">({rating.toFixed(1)}/5.0)</span>
      </div>
    );
  };

  return (
    <div className="details-page-wrapper">
      <div className="product-page-container">
        {/* Breadcrumb/Back link (Optional but recommended) */}
        <Link to={"/Pages/productListPage"} className="nav-link nav-text-link ">
          <p className="product-breadcrumb">&larr; Back to Products</p>
        </Link>
        <div className="product-card-details">
          {/* Product Grid: Image on Left, Details on Right (Large Screens) */}
          <div className="product-grid">
            {/* 1. Product Image / Poster */}
            <div className="product-image-column">
              <div className="product-image-wrapper">
                <img
                  src={movie.coverImage}
                  alt={movie.title}
                  className="product-image"
                />
              </div>
            </div>

            {/* 2. Product Details */}
            <div className="product-details-column">
              <div className="product-details-content">
                {/* Title and Rating */}
                <h1 className="product-title">{movie.title}</h1>
                <div className="product-rating">
                  {/* Now StarRating correctly uses the normalizedRating as its prop */}
                  <StarRating rating={normalizedRating} />
                </div>

                {/* Price */}
                <p className="product-price">{formattedPrice}</p>

                {/* Short Description / Summary */}
                <h3 className="section-title">Description</h3>
                <p className="product-description">{movie.description}</p>

                {/* Key Details */}
                <div className="product-meta">
                  <p>
                    <span className="meta-label">Genre:</span> {""}
                    {Array.isArray(movie.genre)
                      ? movie.genre.map((g) => g.name).join(", ")
                      : movie.genre}
                  </p>
                  <p>
                    <span className="meta-label">Release Date:</span>{" "}
                    {formattedReleaseDate}
                  </p>
                  <p>
                    <span className="meta-label">Product SKU:</span> {movie.sku}
                  </p>
                </div>
              </div>

              <a
                href="#"
                className="btn btn-outline-light me-2 align-items-center"
              >
                <MdOutlineAddShoppingCart className="me-1" />
                Add to Cart
              </a>
            </div>
          </div>

          <hr className="product-details-divider" />

          {/* Extended Details / Reviews (Optional section) */}
          <div className="full-details-section">
            <h2 className="full-details-title">Full Synopsis & Reviews</h2>
            <div className="full-details-text">
              <p>{movie.description}</p>
              {/* You would typically load more detailed data or a reviews component here */}
              <p className="placeholder-text">
                (Placeholder for a reviews section or related products.)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
