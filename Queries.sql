create table clients (
	id serial primary key,
	name varchar(150) not null,
	email varchar(150) unique not null,
	cpf varchar(50) unique not null,
	contact varchar(20) not null
)

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

insert into products (name, amount, color, voltage, description, category_id)
	          values ('controle', 7, 'preto', '220', 'llll', 1 )

