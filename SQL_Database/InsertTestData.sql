INSERT INTO Movies (Title, DirectorId, Studio, GenreId, Rating, Sku, Price, Weight, Dimensions, Description, CoverImage, ReleaseDate)
VALUES
('Inception', 1, 'Warner Bros', 1, 9, 'SKU000001', 14.99, 0.5, '7x5', 'A mind-bending thriller.', 'inception.jpg', '2010-07-16'),
('The Matrix', 2, 'Warner Bros', 1, 10, 'SKU000002', 12.99, 0.45, '7x5', 'Sci-fi action classic.', 'matrix.jpg', '1999-03-31'),
('Interstellar', 1, 'Paramount', 2, 9, 'SKU000003', 16.99, 0.55, '7x5', 'A journey through space and time.', 'interstellar.jpg', '2014-11-07'),
('I Like Water', 3, 'JasonCo', 4, 10, 'SKU000004', 100.99, 0.4, '7x5', '90 minute monoglue about Jason Liking Water', 'water.jpg', '2025-10-23')

INSERT INTO Users (Username, PasswordHash)
VALUES
('critic_john', 'hash1'),
('critic_sarah', 'hash2'),
('critic_mike', 'hash3');

INSERT INTO People (FirstName, LastName)
VALUES
('Christopher', 'Nolan'),
('Lana', 'Wachowski'),
('Keanu', 'Reeves'),
('Leonardo', 'DiCaprio'),
('Matthew', 'McConaughey');

INSERT INTO Genres (Name)
VALUES
('Action'),
('Sci-Fi'),
('Thriller'),
('Drama'),
('Adventure');

INSERT INTO Reviews (CriticId, ReviewDescription, Rating)
VALUES
(1, 'Amazing visuals and storytelling.', 9),
(2, 'Revolutionary sci-fi experience.', 10),
(3, 'Deep and emotional film.', 9);

INSERT INTO Carts (UserId)
VALUES
(1), (2), (3);

INSERT INTO Orders (CartId, MovieId)
VALUES
(1, 1),   -- John buys Inception
(2, 2),   -- Sarah buys The Matrix
(3, 3);   -- Mike buys Interstellar

INSERT INTO Sales (Discount, StartDate, EndDate, Category)
VALUES
(10, '2024-01-01', '2024-01-10', 'Action Movies'),
(5, '2024-02-01', '2024-02-28', 'Sci-Fi');

-- Inception = Action, Sci-Fi, Thriller
INSERT INTO MovieGenres (MovieId, GenreId)
VALUES
(1, 1),
(1, 2),
(1, 3);

-- The Matrix = Action, Sci-Fi
INSERT INTO MovieGenres (MovieId, GenreId)
VALUES
(2, 1),
(2, 2);

-- Interstellar = Sci-Fi, Drama, Adventure
INSERT INTO MovieGenres (MovieId, GenreId)
VALUES
(3, 2),
(3, 4),
(3, 5);

-- Inception (Directed by Nolan, Starring DiCaprio)
INSERT INTO MoviePeople (MovieId, PersonId)
VALUES
(1, 1),  -- Nolan (director)
(1, 4);  -- Leonardo DiCaprio

-- The Matrix (Directed by Wachowski, Starring Keanu)
INSERT INTO MoviePeople (MovieId, PersonId)
VALUES
(2, 2),  -- Wachowski
(2, 3);  -- Keanu Reeves

-- Interstellar (Directed by Nolan, Starring McConaughey)
INSERT INTO MoviePeople (MovieId, PersonId)
VALUES
(3, 1),  -- Nolan again
(3, 5);  -- McConaughey

INSERT INTO MovieReview (MovieId, ReviewId)
VALUES
(1, 1),  -- Inception gets review #1
(2, 2),  -- Matrix gets review #2
(3, 3);  -- Interstellar gets review #3
