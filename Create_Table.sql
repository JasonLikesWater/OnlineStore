DROP TABLE IF EXISTS MovieReview;
DROP TABLE IF EXISTS MoviePeople;
DROP TABLE IF EXISTS MovieGenres;
DROP TABLE IF EXISTS MovieSales;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Carts;
DROP TABLE IF EXISTS Genres;
DROP TABLE IF EXISTS People;
DROP TABLE IF EXISTS Reviews;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Sales;
DROP TABLE IF EXISTS Movies;

CREATE TABLE Movies(
	MovieId int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	Title varchar(255),
	DirectorId int,
	Studio varchar(255),
	GenreId int,
	Rating int,
	Sku varchar(12),
	Price float,
	Weight float,
	Dimensions varchar(20),
	Description varchar(255),
	CoverImage varchar(255),
	ReleaseDate varchar(10)
);

CREATE TABLE Sales(
	SaleId int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	Discount float,
	StartDate varchar(10) DEFAULT '0000-00-00',
	EndDate varchar(10) DEFAULT '0000-00-00',
	Category varchar(255) 
);

CREATE TABLE Users(
	UserId int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	Username varchar(255),
	PasswordHash varchar(255),
	Email varchar(40)
);

CREATE TABLE Reviews(
	ReviewId int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	CriticId int,
	foreign key (CriticId) references Users(UserId),
	ReviewDescription varchar(255),
	Rating int
);

CREATE TABLE People(
	PersonId int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	FirstName varchar(255),
	LastName varchar(255)
);

CREATE TABLE Genres(
	GenreId int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	Name varchar(255)
);

CREATE TABLE Carts(
	CartId int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	UserId int,
	foreign key (UserId) references Users(UserId)
);

CREATE TABLE Orders(
	OrderId int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	CartId int,
	foreign key (CartId) references Carts(CartId),
	MovieId int,
	foreign key (MovieId) references Movies(MovieId)
);

CREATE TABLE MovieSales(
	MovieSaleId int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	SaleId int,
	foreign key (SaleId) references Sales(SaleId),
	MovieId int,
	foreign key (MovieId) references Movies(MovieId)
);

CREATE TABLE MovieGenres(
	MovieGenreId int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	MovieId int,
	foreign key (MovieId) references Movies(MovieId),
	GenreId int,
	foreign key (GenreId) references Genres(GenreId)
);

CREATE TABLE MoviePeople(
	MoviePersonId int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	MovieId int,
	foreign key (MovieId) references Movies(MovieId),
	PersonId int,
	foreign key (PersonId) references People(PersonId)
);

CREATE TABLE MovieReview(
	MovieReviewId int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	MovieId int,
	foreign key (MovieId) references Movies(MovieId),
	ReviewId int,
	foreign key (ReviewId) references Reviews(ReviewId)
); 