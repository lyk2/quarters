create table users(
	u_id serial primary key,
	email text
);

CREATE TABLE maintenance_tickets
(
  ticket_id integer NOT NULL,
  house_id integer NOT NULL,
  resolved boolean NOT NULL,
  urgent_level integer NOT NULL,
  ticket_type integer NOT NULL,
  description text NOT NULL,
  CONSTRAINT ticket_pkey PRIMARY KEY (ticket_id),
  CONSTRAINT house_id_fkey FOREIGN KEY (house_id)
      REFERENCES house (house_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT ticket_type_fkey FOREIGN KEY (ticket_id)
      REFERENCES ticket_type (type_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)

CREATE TABLE house
(
  house_id integer NOT NULL,
  address character(100) NOT NULL,
  city character(100) NOT NULL,
  province character(100) NOT NULL,
  country character(100) NOT NULL,
  postal_code character(50) NOT NULL,
  CONSTRAINT house_pkey PRIMARY KEY (house_id)
)

CREATE TABLE discussion
(
  discussion_id integer NOT NULL,
  house_id integer NOT NULL,
  user_id integer NOT NULL,
  post_date timestamp with time zone NOT NULL,
  post_content text,
  CONSTRAINT discussion_pkey PRIMARY KEY (discussion_id),
  CONSTRAINT house_id_fkey FOREIGN KEY (house_id)
      REFERENCES house (house_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT user_id_fkey FOREIGN KEY (user_id)
      REFERENCES user_info (user_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)