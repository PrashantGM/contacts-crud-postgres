CREATE DATABASE contacts_db;

CREATE TABLE contacts(
  contact_id SERIAL PRIMARY KEY,
  fname VARCHAR(255),
  lname VARCHAR(255),
  phone VARCHAR(255),
  email VARCHAR(255),
  _address VARCHAR(255)
);