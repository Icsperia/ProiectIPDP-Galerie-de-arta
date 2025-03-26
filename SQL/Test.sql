
	USE art_gallery;
	CREATE TABLE accounts (
		id_account INT PRIMARY KEY AUTO_INCREMENT,
		first_name VARCHAR(255),
		last_name VARCHAR(255),
		email VARCHAR(255) UNIQUE,
		password VARCHAR(255)
	);



	CREATE TABLE art (
		id_art INT PRIMARY KEY AUTO_INCREMENT,
		id_artist INT,
		art_name VARCHAR(255),
		art_description TEXT,
		price DECIMAL(10,2),
		FOREIGN KEY (id_artist) REFERENCES accounts(id_account) ON DELETE CASCADE
	);

	CREATE TABLE sales (
		id_sale INT PRIMARY KEY AUTO_INCREMENT,
		id_art INT,
		sale_price DECIMAL(10,2),
		sale_date DATE,
		client_info TEXT,
		FOREIGN KEY (id_art) REFERENCES art(id_art) ON DELETE CASCADE
	);
    
    CREATE TABLE pencil_portraits(
    id_pencil_portraits INT PRIMARY KEY AUTO_INCREMENT,
    id_art INT,
    sale_price DECIMAL(10,2),
    FOREIGN KEY (id_art) REFERENCES art(id_art) ON DELETE CASCADE
    );

	CREATE TABLE acrylic_paintings(
    id_acrylic_portraits INT PRIMARY KEY AUTO_INCREMENT,
    id_art INT,
    sale_price DECIMAL(10,2),
    FOREIGN KEY (id_art) REFERENCES art(id_art) ON DELETE CASCADE
    );
    
    CREATE TABLE watercolor_paintings(
    id_watercolor_paintings INT PRIMARY KEY AUTO_INCREMENT,
    id_art INT,
    sale_price DECIMAL(10,2),
    FOREIGN KEY (id_art) REFERENCES art(id_art) ON DELETE CASCADE
    );
    

