INSERT INTO People (first_name, last_name) VALUES
('Christopher', 'Nolan'),
('Greta', 'Gerwig'),
('Quentin', 'Tarantino'),
('Patty', 'Jenkins'),
('James', 'Cameron'),
('Martin', 'Scorsese'),
('Jordan', 'Peele'),
('Ridley', 'Scott'),
('Sofia', 'Coppola'),
('Chloé', 'Zhao');

INSERT INTO Genres (name) VALUES
('Action'),
('Drama'),
('Comedy'),
('Sci-Fi'),
('Thriller'),
('Horror'),
('Romance'),
('Adventure'),
('Crime'),
('Fantasy');

INSERT INTO Movies (title, director_id, studio, genre, rating, sku, price, weight, dimensions, description, cover_image, release_date) VALUES
('Inception', 1, 'Warner Bros', 'Sci-Fi', 9, 'SKU100001', 14.99, 0.2, '7x5x1', 'A thief enters dreams to steal secrets.', 'inception.jpg', '2010-07-16'),
('Barbie', 2, 'Warner Bros', 'Comedy', 8, 'SKU100002', 19.99, 0.25, '7x5x1', 'Barbie discovers her true self.', 'barbie.jpg', '2023-07-21'),
('Pulp Fiction', 3, 'Miramax', 'Crime', 10, 'SKU100003', 12.49, 0.22, '7x5x1', 'Crime stories collide in LA.', 'pulpfiction.jpg', '1994-10-14'),
('Wonder Woman', 4, 'DC Films', 'Action', 8, 'SKU100004', 13.99, 0.21, '7x5x1', 'Diana becomes a hero during WWI.', 'wonderwoman.jpg', '2017-06-02'),
('Avatar', 5, '20th Century Fox', 'Sci-Fi', 9, 'SKU100005', 16.99, 0.3, '7x5x1', 'A soldier joins a new world.', 'avatar.jpg', '2009-12-18'),
('The Irishman', 6, 'Netflix', 'Drama', 9, 'SKU100006', 17.49, 0.24, '7x5x1', 'Hitman recounts his past.', 'irishman.jpg', '2019-11-01'),
('Get Out', 7, 'Universal', 'Horror', 9, 'SKU100007', 15.99, 0.2, '7x5x1', 'A man uncovers a dark secret.', 'getout.jpg', '2017-02-24'),
('Gladiator', 8, 'DreamWorks', 'Action', 10, 'SKU100008', 14.49, 0.23, '7x5x1', 'General seeks revenge in Rome.', 'gladiator.jpg', '2000-05-05'),
('Lost in Translation', 9, 'Focus Features', 'Romance', 8, 'SKU100009', 11.99, 0.19, '7x5x1', 'Two strangers connect in Tokyo.', 'losttranslation.jpg', '2003-09-12'),
('Nomadland', 10, 'Searchlight', 'Drama', 8, 'SKU100010', 13.49, 0.18, '7x5x1', 'A woman travels the American West.', 'nomadland.jpg', '2020-12-04');

INSERT INTO Users (username, password_hash) VALUES
('cinefan01', 'hash123'),
('criticmaster', 'hash234'),
('movielover', 'hash345'),
('popcornpro', 'hash456'),
('filmnerd', 'hash567'),
('useralpha', 'hash678'),
('betauser', 'hash789'),
('gammawatcher', 'hash890'),
('reviewking', 'hash901'),
('theaterbuff', 'hash012');

INSERT INTO Reviews (critic_id, review_description, rating) VALUES
(1, 'Amazing visuals and story.', 10),
(2, 'Fun and entertaining.', 8),
(3, 'A modern classic.', 10),
(4, 'Great action scenes.', 9),
(5, 'Beautiful world building.', 9),
(6, 'A bit long but great.', 8),
(7, 'Creepy and smart.', 9),
(8, 'Epic and emotional.', 10),
(9, 'Touching and heartfelt.', 8),
(10, 'Deep and reflective.', 8);

INSERT INTO MovieReview (movie_id, review_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

INSERT INTO MovieGenres (movie_id, genre_id) VALUES
(1, 4),  -- Inception → Sci-Fi
(1, 5),  -- + Thriller
(2, 3),  -- Barbie → Comedy
(3, 9),  -- Crime
(3, 5),  -- Thriller
(4, 1),  -- Action
(5, 4),  -- Sci-Fi
(6, 2),  -- Drama
(7, 6),  -- Horror
(8, 1),  -- Action
(9, 7),  -- Romance
(10, 2); -- Drama

INSERT INTO MoviePeople (movie_id, people_id) VALUES
(1, 1),  -- Nolan
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

INSERT INTO Sales (discount, start_date, end_date, category) VALUES
(0.10, '2025-01-01', '2025-01-31', 'Sci-Fi'),
(0.20, '2025-02-01', '2025-02-14', 'Romance'),
(0.15, '2025-03-01', '2025-03-15', 'Action'),
(0.30, '2025-04-01', '2025-04-10', 'Drama'),
(0.25, '2025-05-01', '2025-05-07', 'Horror');

INSERT INTO MovieSales (movie_id, sale_id) VALUES
(1, 1),
(5, 1),
(9, 2),
(4, 3),
(8, 3),
(6, 4),
(7, 5);

INSERT INTO Carts (user_id) VALUES
(1),
(2),
(3),
(4),
(5);

INSERT INTO Orders (cart_id, movie_id) VALUES
(1, 1),
(1, 3),
(2, 2),
(3, 7),
(4, 4),
(4, 5),
(5, 10);
