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
	movie_id int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	title varchar(255),
	director_id int,
	studio varchar(255),
	genre varchar(255),
	rating int,
	sku varchar(12),
	price float,
	weight float,
	dimensions varchar(20),
	description varchar(255),
	cover_image varchar(255),
	release_date varchar(10),
);

CREATE TABLE Sales(
	sale_id int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	discount float,
	start_date varchar(10) DEFAULT '0000-00-00',
	end_date varchar(10) DEFAULT '0000-00-00',
	category varchar(255) 
);

CREATE TABLE Users(
	user_id int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	username varchar(255),
	password_hash varchar(255)
);

CREATE TABLE Reviews(
	review_id int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	critic_id int,
	foreign key (critic_id) references Users(user_id),
	review_description varchar(255),
	rating int
);

CREATE TABLE People(
	people_id int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	first_name varchar(255),
	last_name varchar(255)
);

CREATE TABLE Genres(
	genre_id int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	name varchar(255)
);

CREATE TABLE Carts(
	cart_id int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	user_id int,
	foreign key (user_id) references Users(user_id)
);

CREATE TABLE Orders(
	order_id int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	cart_id int,
	foreign key (cart_id) references Carts(cart_id),
	movie_id int,
	foreign key (movie_id) references Movies(movie_id)
);

CREATE TABLE MovieSales(
	movie_sale_id int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	sale_id int,
	foreign key (sale_id) references Sales(sale_id),
	movie_id int,
	foreign key (movie_id) references Movies(movie_id)
);

CREATE TABLE MovieGenres(
	movie_genre_id int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	movie_id int,
	foreign key (movie_id) references Movies(movie_id),
	genre_id int,
	foreign key (genre_id) references Genres(genre_id)
);

CREATE TABLE MoviePeople(
	movie_people_id int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	movie_id int,
	foreign key (movie_id) references Movies(movie_id),
	people_id int,
	foreign key (people_id) references People(people_id)
);

CREATE TABLE MovieReview(
	movie_review_id int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	movie_id int,
	foreign key (movie_id) references Movies(movie_id),
	review_id int,
	foreign key (review_id) references Reviews(review_id)
);