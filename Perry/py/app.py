import numpy as np
import sqlalchemy
import datetime as dt
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

#set up database
rds_connection_string = "postgres:pear12@localhost:5432/project2"
engine = create_engine(f'postgresql://{rds_connection_string}')

Base = automap_base()
Base.prepare(engine, reflect=True)

#create flask object
app = Flask(__name__)

#create flask routes
@app.route("/")
def home():
    return (
        f"Welcome to the Hospital Value of Care API"
        f"<br> <br>"
        f"Available Routes:<br/>"
        f"/api/v1.0/heart_failure<br/>"
        f"/api/v1.0/hip_knee<br/>"
        f"/api/v1.0/pneumonia<br/>"
        f"/api/v1.0/heart_attack<br/>"

    )

@app.route("/api/v1.0/heart_failure")
def heart_failure():
    # Create our session (link) from Python to the DB
    result = engine.execute("""SELECT voc.zip_code, sum(denominator) as Denominator, round(avg(payment),0) as avg_Payment, value_code, int(median_income)
                                FROM voc
                            LEFT JOIN census 
                                ON census.zip_code = voc.zip_code
                            WHERE value_code = 'HF'
                            Group By voc.zip_code, value_code, census.median_income
                            Order By voc.zip_code;""")

    # Convert list of tuples into normal list
    all_hf = []
    for zip_code, denominator, avg_pmt, val_code, med_inc in result:
        all_hf_dict = {}
        all_hf_dict["Zip Code"] = str(zip_code)
        all_hf_dict["Denominator"] = float(denominator)
        all_hf_dict["Avg Payment"] = float(avg_pmt)
        all_hf_dict["Value Code"] = str(val_code)
        all_hf_dict["Median Income"] =float(med_inc)
        all_hf.append(all_hf_dict)

    return jsonify(all_hf)

@app.route("/api/v1.0/hip_knee")
def hip_knee():
    # Create our session (link) from Python to the DB
    result = engine.execute("""SELECT voc.zip_code, sum(denominator) as Denominator, round(avg(payment),0) as avg_Payment, value_code, int(median_income)
                                FROM voc
                            LEFT JOIN census 
                                ON census.zip_code = voc.zip_code
                            WHERE value_code = 'HIP_KNEE'
                            Group By voc.zip_code, value_code, census.median_income
                            Order By voc.zip_code;""")

    # Convert list of tuples into normal list
    all_hk = []
    for zip_code, denominator, avg_pmt, val_code, med_inc in result:
        all_hk_dict = {}
        all_hk_dict["Zip Code"] = str(zip_code)
        all_hk_dict["Denominator"] = float(denominator)
        all_hk_dict["Avg Payment"] = float(avg_pmt)
        all_hk_dict["Value Code"] = str(val_code)
        all_hk_dict["Median Income"] =float(med_inc)
        all_hk.append(all_hk_dict)

    return jsonify(all_hk)

@app.route("/api/v1.0/pneumonia")
def pneumonia():
    # Create our session (link) from Python to the DB
    result = engine.execute("""SELECT voc.zip_code, sum(denominator) as Denominator, round(avg(payment),0) as avg_Payment, value_code, int(median_income)
                                FROM voc
                            LEFT JOIN census 
                                ON census.zip_code = voc.zip_code
                            WHERE value_code = 'PN'
                            Group By voc.zip_code, value_code, census.median_income
                            Order By voc.zip_code;""")

    # Convert list of tuples into normal list
    all_pn = []
    for zip_code, denominator, avg_pmt, val_code, med_inc in result:
        all_pn_dict = {}
        all_pn_dict["Zip Code"] = str(zip_code)
        all_pn_dict["Denominator"] = float(denominator)
        all_pn_dict["Avg Payment"] = float(avg_pmt)
        all_pn_dict["Value Code"] = str(val_code)
        all_pn_dict["Median Income"] =float(med_inc)
        all_pn.append(all_pn_dict)

    return jsonify(all_pn)

@app.route("/api/v1.0/heart_attack")
def heart_attack(start):
    # Create our session (link) from Python to the DB
    result = engine.execute("""SELECT voc.zip_code, sum(denominator) as Denominator, round(avg(payment),0) as avg_Payment, value_code, int(median_income)
                                FROM voc
                            LEFT JOIN census 
                                ON census.zip_code = voc.zip_code
                            WHERE value_code = 'AMI'
                            Group By voc.zip_code, value_code, census.median_income
                            Order By voc.zip_code;""")

    # Convert list of tuples into normal list
    all_ami = []
    for zip_code, denominator, avg_pmt, val_code, med_inc in result:
        all_ami_dict = {}
        all_ami_dict["Zip Code"] = str(zip_code)
        all_ami_dict["Denominator"] = float(denominator)
        all_ami_dict["Avg Payment"] = float(avg_pmt)
        all_ami_dict["Value Code"] = str(val_code)
        all_ami_dict["Median Income"] =float(med_inc)
        all_ami.append(all_ami_dict)

    return jsonify(all_ami)

if __name__ == '__main__':
    app.run(debug=True)