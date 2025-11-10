DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Sales;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Reviews;
DROP TABLE IF EXISTS People;
DROP TABLE IF EXISTS Genres;


CREATE TABLE Products(
	product_id int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
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
	release_date varchar(10)
);

CREATE TABLE Sales(
	sale_id int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	discount float,
	start_date varchar(10),
	end_date varchar(10),
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