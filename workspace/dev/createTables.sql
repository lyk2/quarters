create table users(
	u_id serial primary key,
	email text
);

create table houses(
	h_id serial primary key,
	address text,
	postal_code text
);

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