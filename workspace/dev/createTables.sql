CREATE TABLE house
(
  house_id serial NOT NULL,
  address character(100) NOT NULL,
  city character(100),
  province character(100),
  country character(100),
  postal_code character(50),
  invite_code character(150) NOT NULL UNIQUE,
  CONSTRAINT house_pkey PRIMARY KEY (house_id)
);

CREATE TABLE "user"
(
  user_id serial NOT NULL,
  email character(100) UNIQUE,
  password character(100),
  CONSTRAINT user_pkey PRIMARY KEY (user_id)
);


CREATE TABLE bill_owed
(
  bill_id integer NOT NULL,
  owed_to integer NOT NULL,
  owned_by integer NOT NULL,
  paid boolean NOT NULL,
  amount money NOT NULL,
  CONSTRAINT bill_pkey PRIMARY KEY (bill_id, owed_to, owned_by),
  CONSTRAINT bill_id_fkey FOREIGN KEY (bill_id)
      REFERENCES finance (bill_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
)

CREATE TABLE finance
(
  house_id integer NOT NULL,
  owner_id integer NOT NULL,
  bill_type character(150) NOT NULL,
  bill_date timestamp without time zone NOT NULL,
  bill_id serial NOT NULL,
  CONSTRAINT bill_id_pkey PRIMARY KEY (bill_id)
)


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
  date_of_birth date,
  description character(255),
  default_house_id integer,
  CONSTRAINT user_info_pkey PRIMARY KEY(user_id),
  CONSTRAINT user_info_fkey FOREIGN KEY (user_id)
    REFERENCES "user" (user_id) MATCH SIMPLE
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE bulletin_posts
(
    post_id serial NOT NULL,
    user_id integer NOT NULL,
    house_id integer NOT NULL,
    comment varchar(255) NOT NULL,
    date_time timestamp,
    CONSTRAINT bulletin_posts_pkey PRIMARY KEY(post_id),
    CONSTRAINT user_id_fkey FOREIGN KEY (user_id)
        REFERENCES "user" (user_id) MATCH SIMPLE
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT house_id_fkey FOREIGN KEY (house_id)
        REFERENCES "house" (house_id) MATCH SIMPLE
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE bulletin_replies
(
    post_id integer NOT NULL,
    user_id integer NOT NULL,
    house_id integer NOT NULL,
    comment varchar(255) NOT NULL,
    date_time timestamp,
    CONSTRAINT bulletin_replies_pkey PRIMARY KEY(post_id, user_id, house_id),
    CONSTRAINT user_id_fkey FOREIGN KEY (user_id)
        REFERENCES "user" (user_id) MATCH SIMPLE
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT house_id_fkey FOREIGN KEY (house_id)
        REFERENCES "house" (house_id) MATCH SIMPLE
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE tickets
(
    ticket_id serial NOT NULL,
    user_id integer NOT NULL,
    house_id integer NOT NULL,
    description varchar(255),
    status varchar(255),
    type int NOT NULL,
    create_date_time timestamp,
    updated_date_time timestamp,
    CONSTRAINT user_id_fkey FOREIGN KEY (user_id)
        REFERENCES "user" (user_id) MATCH SIMPLE
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT house_id_fkey FOREIGN KEY (house_id)
        REFERENCES "house" (house_id) MATCH SIMPLE
        ON UPDATE CASCADE ON DELETE CASCADE
);
