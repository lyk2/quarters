CREATE TABLE "user"
(
  user_id serial NOT NULL,
  email character(100),
  password character(100),
  role_id integer NOT NULL,
  house_id integer,
  CONSTRAINT user_pkey PRIMARY KEY (user_id),
  CONSTRAINT house_id_fkey FOREIGN KEY (house_id)
      REFERENCES house (house_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE SET NULL,
  CONSTRAINT role_id_fkey FOREIGN KEY (role_id)
      REFERENCES role_type (role_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)

CREATE TABLE user_info
(
  user_id integer NOT NULL,
  name character(100),
  date_of_birth date,
  house_id integer,
  CONSTRAINT user_info_pkey PRIMARY KEY (user_id),
  CONSTRAINT house_id_fkey FOREIGN KEY (house_id)
      REFERENCES house (house_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT user_id_fkey FOREIGN KEY (user_id)
      REFERENCES "user" (user_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
)

CREATE TABLE role_type
(
  role_id integer NOT NULL,
  role_name character(150) NOT NULL,
  CONSTRAINT role_id_pkey PRIMARY KEY (role_id)
)

CREATE TABLE priority_level
(
  priority_id serial NOT NULL,
  priority_name character(50) NOT NULL,
  CONSTRAINT priority_level_pkey PRIMARY KEY (priority_id)
)

INSERT INTO priority_level(
            priority_id, priority_name)
    VALUES (0, "Low Priority");

INSERT INTO priority_level(
            priority_id, priority_name)
    VALUES (1, "Medium Priority");

INSERT INTO priority_level(
            priority_id, priority_name)
    VALUES (2, "High Priority");

CREATE TABLE maintenance_tickets
(
  ticket_id serial NOT NULL,
  house_id integer NOT NULL,
  resolved boolean NOT NULL,
  priority_level integer NOT NULL,
  description text NOT NULL,
  CONSTRAINT ticket_pkey PRIMARY KEY (ticket_id),
  CONSTRAINT house_id_fkey FOREIGN KEY (house_id)
      REFERENCES house (house_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)

CREATE TABLE house
(
  house_id serial NOT NULL,
  address character(100) NOT NULL,
  city character(100) NOT NULL,
  province character(100) NOT NULL,
  country character(100) NOT NULL,
  postal_code character(50) NOT NULL,
  CONSTRAINT house_pkey PRIMARY KEY (house_id)
)

CREATE TABLE discussion
(
  discussion_id serial NOT NULL,
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

CREATE TABLE calendar_events
(
  event_id serial NOT NULL,
  event_type_id integer NOT NULL,
  event_date timestamp with time zone NOT NULL,
  description text,
  user_id integer NOT NULL,
  event_location text,
  CONSTRAINT event_id_pkey PRIMARY KEY (event_id),
  CONSTRAINT user_id_fkey FOREIGN KEY (user_id)
      REFERENCES "user" (user_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)

CREATE TABLE notification
(
  notification_id serial NOT NULL,
  notification_type_id integer NOT NULL,
  start_date timestamp with time zone NOT NULL,
  end_date timestamp with time zone NOT NULL,
  is_seen boolean NOT NULL,
  house_id integer NOT NULL,
  user_id integer NOT NULL,
  description text NOT NULL,
  CONSTRAINT notification_id_pkey PRIMARY KEY (notification_id),
  CONSTRAINT house_id FOREIGN KEY (house_id)
      REFERENCES house (house_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT notification_type_id FOREIGN KEY (notification_type_id)
      REFERENCES notification_type (notification_type_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT user_id_fkey FOREIGN KEY (user_id)
      REFERENCES user_info (user_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
)

CREATE TABLE notification_type
(
  notification_type_id integer NOT NULL,
  notification_name character(150) NOT NULL,
  CONSTRAINT type_id_pkey PRIMARY KEY (notification_type_id)
)