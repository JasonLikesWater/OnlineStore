INSERT INTO Movies (Title, DirectorId, Studio, GenreId, Rating, Sku, Price, Weight, Dimensions, Description, CoverImage, ReleaseDate)
VALUES
('Inception', 1, 'Warner Bros', 1, 9, 'SKU000001', 14.99, 0.5, '7x5', 'A mind-bending thriller.', 'inception.jpg', '2010-07-16'),
('The Matrix', 2, 'Warner Bros', 1, 10, 'SKU000002', 12.99, 0.45, '7x5', 'Sci-fi action classic.', 'matrix.jpg', '1999-03-31'),
('Interstellar', 1, 'Paramount', 2, 9, 'SKU000003', 16.99, 0.55, '7x5', 'A journey through space and time.', 'interstellar.jpg', '2014-11-07'),
('I Like Water', 6, 'JasonCo', 4, 10, 'SKU000004', 100.99, 0.4, '7x5', '90 minute monoglue about Jason liking Water', 'water.jpg', '2025-10-23'),
('The Dark Knight', 1, 'Warner Bros', 1, 10, 'SKU000005', 14.49, 0.52, '7x5', 'Batman faces the Joker.', 'darkknight.jpg', '2008-07-18'),
('Dunkirk', 1, 'Warner Bros', 4, 9, 'SKU000006', 13.99, 0.48, '7x5', 'WWII soldiers struggle to survive.', 'dunkirk.jpg', '2017-07-21'),
('John Wick', 3, 'Summit', 1, 9, 'SKU000007', 12.49, 0.46, '7x5', 'A retired assassin seeks revenge.', 'johnwick.jpg', '2014-10-24'),
('Arrival', 7, 'Paramount', 2, 9, 'SKU000008', 15.49, 0.52, '7x5', 'An alien encounter changes humanity.', 'arrival.jpg', '2016-11-11'),
('The Martian', 11, '20th Century Fox', 5, 9, 'SKU000009', 17.99, 0.6, '7x5', 'An astronaut survives on Mars.', 'martian.jpg', '2015-10-02'),
('Blade Runner 2049', 12, 'Warner Bros', 2, 10, 'SKU000010', 18.49, 0.56, '7x5', 'A new blade runner discovers a secret.', 'br2049.jpg', '2017-10-06'),
('Tenet', 1, 'Warner Bros', 3, 8, 'SKU000011', 19.99, 0.57, '7x5', 'Time inversion espionage thriller.', 'tenet.jpg', '2020-08-26'),
('Mad Max: Fury Road', 13, 'Warner Bros', 1, 10, 'SKU000012', 14.79, 0.5, '7x5', 'A desert chase for survival.', 'madmax.jpg', '2015-05-15'),
('The Revenant', 14, '20th Century Fox', 4, 9, 'SKU000013', 13.89, 0.49, '7x5', 'A frontiersman seeks revenge.', 'revenant.jpg', '2015-12-25'),
('Gravity', 15, 'Warner Bros', 2, 8, 'SKU000014', 14.29, 0.44, '7x5', 'Astronauts stranded in space.', 'gravity.jpg', '2013-10-04');


INSERT INTO Users (Username, PasswordHash, Email)
VALUES
('critic_john', '$2b$10$3VmzlaKNkS6mYrBWJwfiI.QP6umIngfT/RxLYVJprm3DSo8bG.Uqm', 'johnseena@gmail.com'),
('critic_sarah', '$2b$10$Nq4QB7SAiKroqtvpUoFSh.Gx3T9LgjR06pHxYJ1l3.Pg2o4BiUX9e', 'sarahrein@thismegacorp.com'),
('critic_mike', '$2b$10$A1x.Xz1.0vizjkdfK/RJqO5aE/1mx2aKXoAuISTQDCUh9nIogebG6', 'mikeshot@gmail.com'),
('film_buff99', '$2b$10$im0itwk4oYwDDzRJpUym4.uAeA3dxBsOOgPoPObsCGcjr96mLoJ52', 'dantheman@gmail.com'),
('spacefan', '$2b$10$dnkw6zQqCpIJ/p52X6Kulug/Yj3tzAynkfMmTHaUXvZsb/.edF3cO', 'nospacenoface@yahoo.com'),
('noirlover', '$2b$10$Jkg2Vhefhy8H2i3MFUBJUu2edH2kVS1upX1//tW855fGZAdAEB3/C', 'wind@terrace.com'),
('action_junkie', '$2b$10$GODpCF3QEehE6Sogw/t/oOt836Rnz1Li2chjhLT4ZvljUiXXUw03K', 'coolguys@underline.com'),
('timetraveler', '$2b$10$lGrmXvlhO21X8sVU09HkP.j0Ac7UtOGXa3aj0q8ZNiYVC5bJ.hxP2', 'lm@backtothepast.com'),
('explorer101', '$2b$10$o6oyVxvPAInc3luwtfbOX.4udSGdNNlSsE/RAlm5zYOyvlyQ/kKX2', 'expo@ler.com'),
('moviequeen', '$2b$10$NVHfVtqKSrq24U1o.xaOe.UhK9EjFV.XarDVJUCZHGMoFoHLnpiwu', 'kachow@times.com'),
('popcornmaster', '$2b$10$j6eKc73Ay2MkxcJEGaFe6uYSRRnI0VWceASprUNdeDoeLgZaYoBp.', 'poppop@acorn.com'),
('cinemaguy', '$2b$10$hWvItP6sSsLMo7i.fKddCOOcOwqKTte9ujp8asmoh7pGsRXJAd71u', 'absolute@martin.com'),
('epicfilms', '$2b$10$uXfZg7ggO3jbaGoJk21KIuab5Ni74.iOoudg8j.0Zy8ESXzaS/90S', 'trailer@screenjunkies.com');

INSERT INTO People (FirstName, LastName)
VALUES
('Christopher', 'Nolan'),
('Lana', 'Wachowski'),
('Keanu', 'Reeves'),
('Leonardo', 'DiCaprio'),
('Matthew', 'McConaughey'),
('Jason', 'Le'),
('Amy', 'Adams'),
('Jeremy', 'Renner'),
('Matt', 'Damon'),
('Ryan', 'Gosling'),
('Charlize', 'Theron'),
('Tom', 'Hardy'),
('Alejandro', 'Inarritu'),
('Sandra', 'Bullock'),
('George', 'Clooney'),
('Denis', 'Villeneuve');

INSERT INTO Genres (Name)
VALUES
('Action'),
('Sci-Fi'),
('Thriller'),
('Drama'),
('Adventure'),
('Biography'),
('Mystery'),
('War'),
('Sci-Fantasy'),
('Psychological');

INSERT INTO Reviews (CriticId, ReviewDescription, Rating)
VALUES
(1, 'Amazing visuals and storytelling.', 9),
(2, 'Revolutionary sci-fi experience.', 10),
(3, 'Deep and emotional film.', 9),
(4, 'Dark, gripping, and unforgettable.', 10),
(5, 'Intense and immersive war film.', 9),
(6, 'Stylish action at its best.', 9),
(7, 'Thought-provoking and emotional.', 9),
(8, 'Inspiring survival story.', 10),
(9, 'A visual masterpiece.', 10),
(10, 'Mind-bending and ambitious.', 8),
(1, 'High-octane nonstop action.', 10),
(2, 'Brutal yet beautiful.', 9),
(3, 'Terrifying and visually stunning.', 8);

INSERT INTO Carts (UserId)
VALUES
(1), (2), (3), (4), (5), (6), (7), (8), (9), (10), (11), (12), (13);

INSERT INTO Orders (CartId, MovieId)
VALUES
(1, 1),   -- John buys Inception
(2, 2),   -- Sarah buys The Matrix
(3, 3),   -- Mike buys Interstellar
(4, 5),
(5, 6),
(6, 7),
(7, 8),
(8, 9),
(9, 10),
(10, 11),
(11, 12),
(12, 13),
(13, 14);

INSERT INTO Sales (Discount, StartDate, EndDate, Category)
VALUES
(10, '2024-01-01', '2024-01-10', 'Action Movies'),
(5, '2024-02-01', '2024-02-28', 'Sci-Fi'),
(15, '2024-03-01', '2024-03-10', 'Oscar Films'),
(20, '2024-04-01', '2024-04-15', 'Sci-Fi Hits'),
(25, '2024-05-01', '2024-05-07', 'Action Classics');

-- Inception = Action, Sci-Fi, Thriller
INSERT INTO MovieGenres (MovieId, GenreId)
VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 2),
(3, 2),
(3, 4),
(3, 5),
(4, 4),   -- I Like Water → Drama
(5, 1),   -- Dark Knight → Action
(5, 3),   -- Thriller
(6, 9),   -- Dunkirk → War
(7, 1),   -- John Wick → Action
(8, 2),   -- Arrival → Sci-Fi
(8, 10),  -- Psychological
(9, 5),   -- Martian → Adventure
(10, 2),  -- BR2049 → Sci-Fi
(10, 10), -- Psychological
(11, 3),  -- Tenet → Thriller
(12, 1),  -- Fury Road → Action
(12, 5),  -- Adventure
(13, 4),  -- Revenant → Drama
(13, 6),  -- Biography
(14, 2);

-- Inception (Directed by Nolan, Starring DiCaprio)
INSERT INTO MoviePeople (MovieId, PersonId)
VALUES
(1, 1),  -- Nolan (director)
(1, 4),  -- Leonardo DiCaprio
(2, 2),  -- Wachowski
(2, 3), 
(3, 1),  -- Nolan again
(3, 5), -- Keanu Reeves
(4, 6),   -- Jason Le (director)
(5, 1),   -- Nolan
(5, 4),   -- DiCaprio
(6, 1),   -- Nolan
(7, 3),   -- Keanu Reeves
(8, 10),  -- Denis Villeneuve
(8, 7),   -- Amy Adams
(9, 13),  -- Matt Damon
(10, 10), -- Villeneuve again
(10, 14), -- Gosling
(11, 1),  -- Nolan
(12, 13), -- Hardy
(12, 11), -- Charlize Theron
(13, 15), -- Inarritu
(13, 4),  -- DiCaprio
(14, 16), -- Sandra Bullock
(14, 17);

INSERT INTO MovieReview (MovieId, ReviewId)
VALUES
(1, 1),  -- Inception gets review #1
(2, 2),  -- Matrix gets review #2
(3, 3),  -- Interstellar gets review #3
(4, 4),   -- I Like Water
(5, 5),   -- Dark Knight
(6, 6),   -- Dunkirk
(7, 7),   -- John Wick
(8, 8),   -- Arrival
(9, 9),   -- Martian
(10, 10), -- BR2049
(11, 11), -- Tenet
(12, 12), -- Fury Road
(13, 13), -- Revenant
(14, 14);

INSERT INTO MovieSales (MovieId, SaleId)
VALUES
(5, 3),
(8, 4),
(10, 4),
(12, 5),
(7, 5);