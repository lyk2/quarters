CREATE TABLE house
(
  house_id serial NOT NULL,
  address character(100) NOT NULL,
  city character(100),
  province character(100),
  country character(100),
  postal_code character(50),
  invite_code character(150) NOT NULL,
  CONSTRAINT house_pkey PRIMARY KEY (house_id)
);

CREATE TABLE "user"
(
  user_id serial NOT NULL,
  email character(100) UNIQUE,
  password character(100),
  CONSTRAINT user_pkey PRIMARY KEY (user_id)
);


CREATE TABLE "role"
(
  user_id integer NOT NULL,
  house_id integer NOT NULL,
  role smallint NOT NULL,
  CONSTRAINT role_pkey PRIMARY KEY(user_id, house_id, role),
  CONSTRAINT house_id_fkey FOREIGN KEY (house_id)
    REFERENCES house (house_id) MATCH SIMPLE
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT user_id_fkey FOREIGN KEY (user_id)
    REFERENCES "user" (user_id) MATCH SIMPLE
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE user_info
(
  user_id integer NOT NULL,
  full_name character(50),
  cell_num integer,
  description character(255),
  default_house_id integer,
  CONSTRAINT user_info_pkey PRIMARY KEY(user_id),
  CONSTRAINT user_info_fkey FOREIGN KEY (user_id)
    REFERENCES "user" (user_id) MATCH SIMPLE
    ON UPDATE CASCADE ON DELETE CASCADE
);
