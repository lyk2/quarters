CREATE TABLE house
(
  house_id serial NOT NULL,
  address character(100) NOT NULL,
  city character(100),
  province character(100),
  country character(100),
  postal_code character(50),
  CONSTRAINT house_pkey PRIMARY KEY (house_id)
);

CREATE TABLE "user"
(
  user_id serial NOT NULL,
  email character(100) NOT NULL,
  password character(100),
  CONSTRAINT user_pkey PRIMARY KEY (user_id)
);


