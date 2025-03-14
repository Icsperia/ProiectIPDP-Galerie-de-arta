
	USE art_gallery;
	CREATE TABLE users (
		id INT PRIMARY KEY AUTO_INCREMENT,
		first_name VARCHAR(255),
		last_name VARCHAR(255),
		email VARCHAR(255) UNIQUE,
		password VARCHAR(255)
	);

	CREATE TABLE artist (
		id_artist INT PRIMARY KEY AUTO_INCREMENT,
		name VARCHAR(255)
	);

	CREATE TABLE art (
		id_art INT PRIMARY KEY AUTO_INCREMENT,
		id_artist INT,
		art_name VARCHAR(255),
		art_description TEXT,
		price DECIMAL(10,2),
		FOREIGN KEY (id_artist) REFERENCES artist(id_artist) ON DELETE CASCADE
	);

	CREATE TABLE sales (
		id_sale INT PRIMARY KEY AUTO_INCREMENT,
		id_art INT,
		sale_price DECIMAL(10,2),
		sale_date DATE,
		client_info TEXT,
		FOREIGN KEY (id_art) REFERENCES art(id_art) ON DELETE CASCADE
	);

			
	insert into artist values(1,"Name");
	select * from artist;