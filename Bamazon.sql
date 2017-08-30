CREATE DATABASE bamazon;
use bamazon;

CREATE TABLE products
(
	item_id INTEGER (100)
	AUTO_INCREMENT NOT NULL,
	product_name VARCHAR
	(500) NOT NULL,
	department_name VARCHAR
	(500) NOT NULL,
	price DECIMAL
	(10,2) NOT NULL,
	stock_quantity INTEGER
	(100) NOT NULL,
	primary key
	(item_id)
);

	INSERT INTO products
		(product_name, department_name, price, stock_quantity)
	VALUES
		('Amazon Echo', 'Echo & Alexa Devices', 59.99, 40),
		('Echo Dot 2nd Generation - Black' , 'Devices', 50, 100),
		('Gift Certificate', 'Miscellaneous', 10, 150),
		('Bianchi Bicycle', 'Sports', 7550.44, 12),
		('Where the Red Fern Grows', 'Books', 12.75, 200),
		('Empire Strikes Back', 'Films', 23.43, 50),
		('The Man in the High Castle', 'Music', 9.49, 250),
		('Aquarium', 'Pet Supplies', 55.22, 56),
		('Fresh Snow, Yosemite, CA', 'Photography', 14.22, 34),
		('NFL Pittsburgh Steelers Garden Gnome', 'Garden Statues', 24.99, 25),
		('Ukelele', 'Musical Instruments', 54.99, 27),
		('Easel', 'Art Supplies', 19.99, 430),
		('Himalayan Glow Hand Carved Natural Crystal Himalayan Salt Lamp', 'Lighting', 29.99, 100),
		('Ancient Peaks Renegade', 'wine', 23.99, 500),
		('Chateau De Piza Morgon', 'wine', 15.98, 400),
		('Durigutti HD Malbec', 'wine', 15.98, 300),
		('Head First SQL', 'book', 49.99, 17),
		('UML Distilled 3rd Ed.', 'books', 49.99, 98),
		('Crab Cake Jumbo Lump', 'food', 11.90, 47),
		('Blue Diamond Nut Thins', 'food', 34.99, 300),
		('HB Modern Chrome Toaster', 'appliances', 200.00, 400),
		('Acrylic Stemless Wine Glass', 'housewares', 7.90, 390),
        ('______________________________________________________')


	SELECT * FROM products
