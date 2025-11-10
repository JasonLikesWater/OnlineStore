INSERT INTO People (first_name, last_name) VALUES
('Christopher', 'Nolan'),
('Greta', 'Gerwig'),
('Quentin', 'Tarantino'),
('Chloé', 'Zhao'),
('Martin', 'Scorsese'),
('Jordan', 'Peele'),
('Sofia', 'Coppola'),
('James', 'Cameron'),
('Ridley', 'Scott'),
('Patty', 'Jenkins');

INSERT INTO Genres (name) VALUES
('Action'),
('Drama'),
('Comedy'),
('Thriller'),
('Sci-Fi'),
('Romance'),
('Horror'),
('Adventure'),
('Animation'),
('Documentary');

INSERT INTO Products 
(title, director_id, studio, genre, rating, sku, price, weight, dimensions, description, cover_image, release_date) VALUES
('Inception', 1, 'Warner Bros', 'Sci-Fi', 9, 'SKU000001', 14.99, 0.2, '7x5x1', 'A thief who enters dreams to steal secrets faces his toughest mission.', 'inception.jpg', '2010-07-16'),
('Barbie', 2, 'Warner Bros', 'Comedy', 8, 'SKU000002', 19.99, 0.25, '7x5x1', 'A live-action adventure of Barbie discovering her true self.', 'barbie.jpg', '2023-07-21'),
('Pulp Fiction', 3, 'Miramax', 'Thriller', 10, 'SKU000003', 12.99, 0.22, '7x5x1', 'Interwoven stories of crime and redemption in Los Angeles.', 'pulpfiction.jpg', '1994-10-14'),
('Nomadland', 4, 'Searchlight', 'Drama', 8, 'SKU000004', 13.49, 0.19, '7x5x1', 'A woman embarks on a journey through the American West.', 'nomadland.jpg', '2020-12-04'),
('The Irishman', 5, 'Netflix', 'Drama', 9, 'SKU000005', 17.99, 0.24, '7x5x1', 'A mob hitman recalls his involvement with crime and politics.', 'irishman.jpg', '2019-11-01'),
('Get Out', 6, 'Universal', 'Horror', 9, 'SKU000006', 15.99, 0.2, '7x5x1', 'A young man uncovers a shocking truth about his girlfriend’s family.', 'getout.jpg', '2017-02-24'),
('Lost in Translation', 7, 'Focus Features', 'Romance', 8, 'SKU000007', 11.99, 0.18, '7x5x1', 'Two lost souls form an unlikely bond in Tokyo.', 'lostintranslation.jpg', '2003-09-12'),
('Avatar', 8, '20th Century Fox', 'Sci-Fi', 9, 'SKU000008', 16.99, 0.28, '7x5x1', 'A marine joins a new world and fights for its people.', 'avatar.jpg', '2009-12-18'),
('Gladiator', 9, 'DreamWorks', 'Action', 10, 'SKU000009', 14.49, 0.23, '7x5x1', 'A betrayed general fights for revenge in ancient Rome.', 'gladiator.jpg', '2000-05-05'),
('Wonder Woman', 10, 'DC Films', 'Action', 8, 'SKU000010', 13.99, 0.22, '7x5x1', 'An Amazonian warrior discovers her destiny in World War I.', 'wonderwoman.jpg', '2017-06-02');

INSERT INTO Sales (discount, start_date, end_date, category) VALUES
(0.15, '2025-11-01', '2025-11-30', 'Action'),
(0.10, '2025-12-01', '2025-12-31', 'Drama'),
(0.20, '2025-10-15', '2025-11-15', 'Sci-Fi'),
(0.25, '2025-09-01', '2025-09-15', 'Comedy'),
(0.30, '2025-07-01', '2025-07-10', 'Romance');

INSERT INTO Users (username, password_hash) VALUES
('moviebuff123', 'hash_abc123'),
('criticcorner', 'hash_def456'),
('cinemalover', 'hash_ghi789'),
('popcornfan', 'hash_jkl012'),
('actionaddict', 'hash_mno345');

INSERT INTO Reviews (critic_id, review_description, rating) VALUES
(1, 'A brilliant masterpiece of storytelling and visuals.', 10),
(2, 'Surprisingly heartfelt and funny throughout.', 9),
(3, 'Classic Tarantino dialogue and tension — perfection.', 10),
(4, 'A quiet, reflective journey through modern America.', 8),
(6, 'Chilling, thought-provoking, and socially relevant.', 9),
(7, 'Beautifully shot and emotionally moving.', 8),
(9, 'Epic battles and strong performances all around.', 10),
(10, 'Empowering and visually stunning superhero tale.', 8);