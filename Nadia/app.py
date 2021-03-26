import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
from flask import Flask, jsonify

rds_connection_string = "postgres:3411@localhost:5432/project2"
engine = create_engine(f'postgresql://{rds_connection_string}')

connection = engine.connect()
result1 = connection.execute("SELECT value.zip_code, sum(denominator) as Denominator, round(avg(denominator)) as avg_case_number, round(avg(payment),0) as Avg_Payment, round(max(payment)) as max_payment, round(min(payment)) as min_payment, median_income, value_code FROM value LEFT JOIN census  ON census.zip_code = value.zip_code WHERE value_code = 'HF' Group By value.zip_code, value_code, census.median_income Order By value.zip_code;")
data1=[]

for row in result1:
    HF = {
        "zip_code": row[0],
        "total_number_of_cases": float(row[1]),
        "avg_number_of_cases" : float(row[2]),
        "avg_payment": float(row[3]),
        "max_payment": float(row[4]),
        "min_payment": float(row[5]),
        "median_income": row[6]
    }
    data1.append(HF)
    # print(data1)

app = Flask(__name__)

@app.route("/api/v1.0/HF")
def heart_failure():
    """Return the HF data as json"""
    print(data1)
    return jsonify(data1)

if __name__ == "__main__":
    app.run(debug=True)

