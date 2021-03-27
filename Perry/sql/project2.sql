-- Value of Care Create Table

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
denominator INTEGER,
payment INTEGER,
value_of_care_display_name VARCHAR, 
value_of_care_category VARCHAR,
outcome VARCHAR,
value_code VARCHAR

);

-- Census Create Table

CREATE TABLE census (
id SERIAL Primary Key,
zip_code VARCHAR,
population INTEGER,
poverty_rate INTEGER,
median_income DOUBLE PRECISION

);

-- Zipcode Create Table

CREATE TABLE zipcode (
id SERIAL Primary Key,
Zip VARCHAR,
City VARCHAR,
State VARCHAR,
Latitude DOUBLE PRECISION,
Longitude DOUBLE PRECISION,
Timezone Integer,
"Daylight savings time flag" Integer,
geopoint VARCHAR

);

-- Heart Failure

SELECT voc.zip_code, 
        sum(denominator) as Denominator, 
        round(avg(payment),0) as avg_Payment, 
        value_code, 
        median_income,
        latitude, 
        longitude
FROM voc
LEFT JOIN census ON census.zip_code = voc.zip_code
LEFT JOIN zipcode ON zipcode.zip = voc.zip_code
Group By voc.zip_code, value_code, census.median_income, latitude, longitude
WHERE value_code = 'HF'
Group By voc.zip_code, value_code, census.median_income, latitude, longitude
Order By voc.zip_code;

-- Heart Attack

SELECT voc.zip_code, 
        sum(denominator) as Denominator, 
        round(avg(payment),0) as avg_Payment, 
        value_code, 
        median_income,
        latitude, 
        longitude
FROM voc
LEFT JOIN census ON census.zip_code = voc.zip_code
LEFT JOIN zipcode ON zipcode.zip = voc.zip_code
Group By voc.zip_code, value_code, census.median_income, latitude, longitude
WHERE value_code = 'AMI'
Group By voc.zip_code, value_code, census.median_income, latitude, longitude
Order By voc.zip_code;

-- Pneumonia

SELECT voc.zip_code, 
        sum(denominator) as Denominator, 
        round(avg(payment),0) as avg_Payment, 
        value_code, 
        median_income,
        latitude, 
        longitude
FROM voc
LEFT JOIN census ON census.zip_code = voc.zip_code
LEFT JOIN zipcode ON zipcode.zip = voc.zip_code
Group By voc.zip_code, value_code, census.median_income, latitude, longitude
WHERE value_code = 'PN'
Group By voc.zip_code, value_code, census.median_income, latitude, longitude
Order By voc.zip_code;

-- Hip Knee

SELECT voc.zip_code, 
        sum(denominator) as Denominator, 
        round(avg(payment),0) as avg_Payment, 
        value_code, 
        median_income,
        latitude, 
        longitude
FROM voc
LEFT JOIN census ON census.zip_code = voc.zip_code
LEFT JOIN zipcode ON zipcode.zip = voc.zip_code
Group By voc.zip_code, value_code, census.median_income, latitude, longitude
WHERE value_code = 'HIP_KNEE'
Group By voc.zip_code, value_code, census.median_income, latitude, longitude
Order By voc.zip_code;

-- National Stats

SELECT value_code, 
		sum(denominator) as total_cases, 
		round(avg(payment),0) as avg_payment, 
		max(payment) as max_payment,
		min(payment) as min_payment,
		round(avg(median_income)) as avg_med_inc,
		round(max(median_income)) as max_med_inc,
		round(min(median_income)) as min_med_inc
FROM voc
LEFT JOIN census 
    ON census.zip_code = voc.zip_code
Group By value_code
Order By value_code; 