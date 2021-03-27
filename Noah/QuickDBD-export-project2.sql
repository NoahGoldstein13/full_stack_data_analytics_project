-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Value" (
    "facility_id" VARCHAR   NOT NULL,
    "facility_name" VARCHAR   NOT NULL,
    "address" VARCHAR   NOT NULL,
    "city" VARCHAR   NOT NULL,
    "state" VARCHAR   NOT NULL,
    "zip_code" VARCHAR   NOT NULL,
    "payment_measure_name" VARCHAR   NOT NULL,
    "payment_category" VARCHAR   NOT NULL,
    "denominator" NUMERIC   NOT NULL,
    "payment" NUMERIC   NOT NULL,
    "value_of_care_display_name" VARCHAR   NOT NULL,
    "value_of_care_category" VARCHAR   NOT NULL,
    "outcome" VARCHAR   NOT NULL,
    "value_code" VARCHAR   NOT NULL
);

CREATE TABLE "Census" (
    "zip_code" VARCHAR   NOT NULL,
    "population" NUMERIC   NOT NULL,
    "poverty_rate" NUMERIC   NOT NULL,
    "median_income" NUMERIC   NOT NULL
);

CREATE TABLE "Zipcode" (
    "Zip" VARCHAR   NOT NULL,
    "City" VARCHAR   NOT NULL,
    "State" VARCHAR   NOT NULL,
    "Latitude" DOUBLE   NOT NULL,
    "Longitude" DOUBLE   NOT NULL,
    "Timezone" Integer   NOT NULL,
    "Daylight savings time flag" Integer   NOT NULL,
    "geopoint" VARCHAR   NOT NULL
);

ALTER TABLE "Value" ADD CONSTRAINT "fk_Value_zip_code" FOREIGN KEY("zip_code")
REFERENCES "Zipcode" ("Zip");

ALTER TABLE "Census" ADD CONSTRAINT "fk_Census_zip_code" FOREIGN KEY("zip_code")
REFERENCES "Value" ("zip_code");

