create table clients (
	id serial primary key,
	name varchar(150) not null,
	email varchar(150) unique not null,
	cpf varchar(50) unique not null,
	contact varchar(20) not null
);

	INSERT INTO clients (name, email, cpf, contact) VALUES
('João Silva', 'joao.silva@example.com', '12345678901', '999999999'),
('Maria Oliveira', 'maria.oliveira@example.com', '23456789012', '988888888'),
('Carlos Pereira', 'carlos.pereira@example.com', '34567890123', '977777777'),
('Ana Souza', 'ana.souza@example.com', '45678901234', '966666666'),
('Pedro Santos', 'pedro.santos@example.com', '56789012345', '955555555'),
('Lucia Ferreira', 'lucia.ferreira@example.com', '67890123456', '944444444'),
('Marcos Lima', 'marcos.lima@example.com', '78901234567', '933333333'),
('Clara Rodrigues', 'clara.rodrigues@example.com', '89012345678', '922222222'),
('Paulo Costa', 'paulo.costa@example.com', '90123456789', '911111111'),
('Fernanda Almeida', 'fernanda.almeida@example.com', '01234567890', '900000000');

select * from clients

create table category (
	id serial primary key,
	name varchar(150) not null
)

select * from category

INSERT INTO category (name) VALUES
('Eletrônicos'),
('Roupas'),
('Casa e Cozinha'),
('Livros'),
('Beleza e Cuidados Pessoais'),
('Esportes e Lazer'),
('Brinquedos e Jogos'),
('Automotivo'),
('Ferramentas e Construção'),
('Computadores e Acessórios');


create type voltage as enum('110', '220')

create table products (
	id serial primary key,
	name varchar(150) not null,
	amount varchar(150) unique default(0),
	color varchar(50),
	voltage voltage,
	description text,
	category_id int not null,
	CONSTRAINT fk_category
      FOREIGN KEY(category_id) 
        REFERENCES category(id)
)

select * from products

INSERT INTO products (name, amount, color, voltage, description, category_id, price) VALUES
('Smartphone', '50', 'Preto', '110', 'Smartphone com 128GB', 1, 2999.99),
('Camiseta', '100', 'Azul', '110', 'Camiseta de algodão', 2, 49.99),
('Liquidificador', '20', 'Branco', '220', 'Liquidificador 2L', 3, 199.99),
('Livro de Ficção', '30', 'N/A', '110', 'Livro de ficção científica', 4, 39.99),
('Shampoo', '60', 'Transparente', '110', 'Shampoo para todos os tipos de cabelo', 5, 19.99),
('Bicicleta', '15', 'Vermelho', '110', 'Bicicleta aro 26', 6, 599.99),
('Boneco de Ação', '40', 'Colorido', '110', 'Boneco de ação articulado', 7, 79.99),
('Rádio Automotivo', '25', 'Preto', '220', 'Rádio automotivo com Bluetooth', 8, 199.99),
('Furadeira', '10', 'Amarelo', '220', 'Furadeira elétrica 500W', 9, 299.99),
('Mouse', '51', 'Preto', '110', 'Mouse óptico USB', 10, 59.99);



alter table products add column price decimal(10,2)


create table orders (
	id serial primary key,
	client_id int not null,
	total decimal(10,2),
	address text,
	observations text,
	CONSTRAINT client_id
      FOREIGN KEY(client_id) 
        REFERENCES clients(id)
)

create table orders_items(
	id serial primary key,
	order_id int not null,
	product_id int not null ,
	amount int not null,
	price decimal(10,2) not null,
	CONSTRAINT order_id
      FOREIGN KEY(order_id) 
        REFERENCES orders(id),
	CONSTRAINT product_id
      FOREIGN KEY(product_id) 
        REFERENCES products(id)
)



