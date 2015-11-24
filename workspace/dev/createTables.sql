create table users(
	u_id serial primary key,
	email text
);

create table houses(
	h_id serial primary key,
	address text,
	postal_code text
);