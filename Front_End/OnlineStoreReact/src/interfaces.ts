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
 movieId: number; 
 title: string;
 sku: string;
 price: number; // Make nullable
 movieRating: number;
 releaseDate: string;
 description: string;
 coverImage: string;
 
 // Assuming the serializer is also camelCasing these complex properties:
 directorFirstName: string;
 directorLastName: string;
 genre: string;
 criticUsername: string;
 reviewScore: number;
 reviewDescription: string;
 saleDiscount: number;
 saleCategory: string;
}

export interface DetailParams {
  // Keep this as is
  productId: string; 
  
  // The required index signature:
  [key: string]: string | undefined; 
}

export interface CartItem {
  cartId: number;
  movieId: number;
  title: string;
  price: number;
  quantity: number;
  orderIds: number[];
}


export type DecodedToken = {
  exp: number;
  UserId: string;
  Username: string;
}