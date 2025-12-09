export interface Movie {
 // Changed from PascalCase to camelCase to match JSON output:
 movieId: number; 
 title: string;
 directorId: number;
 studio: string;
 genreId: number;
 rating: number;
 sku: string;
 
  // IMPORTANT: Price is now nullable to handle "null" from the database
 price: number | null; 
 
 weight: number;
 dimensions: string;
 description: string;
 coverImage: string;
 releaseDate: string; // Keep as string, as that's how it's sent in JSON
}

export interface MovieDetails {
 // Changed from PascalCase to camelCase to match JSON output:
 title: string;
 sku: string;
 price: number | null; // Make nullable
 rating: number;
 releaseDate: string;
 description: string;
 coverImage: string;
 
 // Assuming the serializer is also camelCasing these complex properties:
 directorFirstName: string;
 directorLastName: string;
 genre: string;
 criticUsername: string;
 customerRating: number;
 customerReview: string;
 discount: number;
 saleCategory: string;
}

export interface DetailParams {
  // Keep this as is
  productId: string; 
  
  // The required index signature:
  [key: string]: string | undefined; 
}