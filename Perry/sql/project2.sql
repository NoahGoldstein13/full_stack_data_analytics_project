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

CREATE TABLE census (
id SERIAL Primary Key,
zip_code VARCHAR,
population NUMERIC,
poverty_rate NUMERIC,
median_income NUMERIC

);

CREATE TABLE readmissions (
id SERIAL Primary Key,
facility_name VARCHAR,
facility_id NUMERIC,
measure_name VARCHAR,
number_of_discharges NUMERIC,
excess_readmission_ratio DOUBLE PRECISION,
number_of_readmissions NUMERIC

);

-- Heart Failure

SELECT voc.zip_code, 
        sum(denominator) as Denominator, 
        round(avg(payment),0) as avg_Payment, 
        value_code, 
        median_income
FROM voc
LEFT JOIN census 
    ON census.zip_code = voc.zip_code
WHERE value_code = 'HF'
Group By voc.zip_code, value_code, census.median_income
Order By voc.zip_code;

-- Heart Attack

SELECT voc.zip_code, 
        sum(denominator) as denominator, 
        round(avg(payment),0) as avg_payment, 
        value_code, 
        median_income
FROM voc
LEFT JOIN census 
    ON census.zip_code = voc.zip_code
WHERE value_code = 'AMI'
Group By voc.zip_code, value_code, census.median_income
Order By voc.zip_code;

-- Pneumonia

SELECT voc.zip_code, 
        sum(denominator) as denominator, 
        round(avg(payment),0)as avg_payment, 
        value_code, 
        median_income
FROM voc
LEFT JOIN census 
    ON census.zip_code = voc.zip_code
WHERE value_code = 'PN'
Group By voc.zip_code, value_code, census.median_income
Order By voc.zip_code;

-- Hip Knee

SELECT voc.zip_code, 
        sum(denominator)  as denominator, 
        round(avg(payment),0)as avg_payment, 
        value_code, 
        median_income
FROM voc
LEFT JOIN census 
    ON census.zip_code = voc.zip_code
WHERE value_code = 'HIP_KNEE'
Group By voc.zip_code, value_code, census.median_income
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