export interface Movie {
  MovieId: number; 
  Title: string;
  DirectorId: number;
  Studio: string;
  GenreId: number;
  Rating: number;
  Sku: string;
  Price: number;
  Weight: number;
  Dimensions: string;
  Description: string;
  CoverImage: string;
  ReleaseDate: string;
 
}

export interface MovieDetails {
  Title: string;
  Sku: string;
  Price: number;
  Rating: number;
  ReleaseDate: string;
  Description: string;
  CoverImage: string;
  DirectorFirstName: string;
  DirectorLastName: string;
  Genre: string;
  CriticUsername: string;
  CustomerRating: number;
  CustomerReview: string;
  Discount: number;
  SaleCategory: string;
}

export interface DetailParams {
    // Your defined variable:
    productId: string; 
    
    // The required index signature:
    [key: string]: string | undefined; 
}
