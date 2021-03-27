-- Schema

CREATE TABLE value (

id SERIAL Primary Key,
facility_id VARCHAR,
facility_name VARCHAR,
address VARCHAR,
city VARCHAR,
state VARCHAR, 
zip_code VARCHAR,
payment_measure_name VARCHAR,
payment_category VARCHAR,
denominator NUMERIC,
payment NUMERIC,
value_of_care_display_name VARCHAR, 
value_of_care_category VARCHAR,
outcome VARCHAR,
value_code VARCHAR

);

-- Census Create Table

CREATE TABLE census (
id SERIAL Primary Key,
zip_code VARCHAR,
population NUMERIC,
poverty_rate NUMERIC,
median_income NUMERIC

);

-- Readmissions Create Table

CREATE TABLE readmissions (
id SERIAL Primary Key,
facility_name VARCHAR,
facility_id NUMERIC,
measure_name VARCHAR,
number_of_discharges NUMERIC,
excess_readmission_ratio DOUBLE PRECISION,
number_of_readmissions NUMERIC

);

-- Zipcode Create Table

CREATE TABLE zipcode (
id SERIAL Primary Key,
zip VARCHAR,
Latitude DOUBLE PRECISION,
Longitude DOUBLE PRECISION

);

SELECT * 
FROM readmissions;

SELECT * 
FROM census

SELECT *
FROM value;