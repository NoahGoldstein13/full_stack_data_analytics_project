CREATE TABLE value (

facility_id INT,
facility_name TEXT,
address VARCHAR,
city VARCHAR,
state VARCHAR, 
zip_code INT,
payment_measure_id VARCHAR,
payment_measure_name VARCHAR,
payment_category VARCHAR,
denominator INT,
payment INT, 
lower_estimate INT,
higher_estimate INT, 
value_of_care_display_id VARCHAR,
value_of_care_display_name VARCHAR, 
value_of_care_category VARCHAR 

);

CREATE TABLE census (

zip_code INT,
poulation INT,
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