CREATE TABLE value (

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

CREATE TABLE census (

zipcode VARCHAR,
population INT,
poverty_rate DECIMAL,
median_income INT

);

CREATE TABLE readmissions (

facility_name VARCHAR,
facility_id INT,
measure_name VARCHAR,
number_of_discharges INT,
excess_readmission_ratio DECIMAL,
number_of_readmissions INT

);

SELECT * 
FROM readmissions;

SELECT * 
FROM census

SELECT *
FROM value;