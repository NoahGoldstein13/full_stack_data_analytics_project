import numpy as np
import sqlalchemy
import datetime as dt
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

#set up database
rds_connection_string = "postgres:3411@localhost:5432/project2"
engine = create_engine(f'postgresql://{rds_connection_string}')

Base = automap_base()
Base.prepare(engine, reflect=True)

#create flask object
app = Flask(__name__)

cors = CORS(app)

# app.config['CORS_HEADERS'] = 'Content-Type'

# cors = CORS(app, resources={r"/api/v1.0/heart_failure": {"origins": "http://[::]:8000"}})
# cors = CORS(app, resources={r"/api/v1.0/hip_knee": {"origins": "http://[::]:8000"}})
# cors = CORS(app, resources={r"/api/v1.0/pneumonia": {"origins": "http://[::]:8000"}})
# cors = CORS(app, resources={r"/api/v1.0/heart_attack": {"origins": "http://[::]:8000"}})
# cors = CORS(app, resources={r"/api/v1.0/national_stats": {"origins": "http://[::]:8000"}})

# @cross_origin(origin='localhost',headers=['Content- Type','Authorization'])

#create flask routes
@app.route("/")
def home():
    return (
        f"Welcome to the Hospital Value of Care API"
        f"<br> <br>"
        f"Available Routes:<br/>"
        f"/api/v1.0/all_data<br/>"
        f"/api/v1.0/heart_failure<br/>"
        f"/api/v1.0/hip_knee<br/>"
        f"/api/v1.0/pneumonia<br/>"
        f"/api/v1.0/heart_attack<br/>"
        f"/api/v1.0/national_stats<br/>"

    )
def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "http://[::]:8000")
    return response

@app.route("/api/v1.0/all_data")
def all_data():
    # Create our session (link) from Python to the DB
    result = engine.execute("""SELECT voc.zip_code, 
                                    sum(denominator) as Denominator, 
                                    round(avg(payment),0) as avg_Payment, 
                                    value_code, median_income, 
                                    latitude, 
                                    longitude
                                FROM voc
                                LEFT JOIN census ON census.zip_code = voc.zip_code
                                LEFT JOIN zipcode ON zipcode.zip = voc.zip_code
                                Group By voc.zip_code, value_code, census.median_income, latitude, longitude
                                Order By voc.zip_code;""")

    # Convert list of tuples into normal list
    all_ad = []
    for zip_code, denominator, avg_pmt, val_code, med_inc, latitude, longitude in result:
        all_ad_dict = {}
        all_ad_dict["Zip Code"] = str(zip_code)
        all_ad_dict["Denominator"] = float(denominator)
        all_ad_dict["Avg Payment"] = float(avg_pmt)
        all_ad_dict["Value Code"] = str(val_code)
        all_ad_dict["Median Income"] = med_inc
        all_ad_dict["Latitude"] = latitude
        all_ad_dict["Longitude"] = longitude
        all_ad.append(all_ad_dict)

    return jsonify(all_ad)

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "http://[::]:8000")
    return response

@app.route("/api/v1.0/heart_failure")
def heart_failure():
    # Create our session (link) from Python to the DB
    result = engine.execute("""SELECT voc.zip_code, 
                                    sum(denominator) as Denominator, 
                                    round(avg(payment),0) as avg_Payment, 
                                    value_code, median_income, 
                                    latitude, 
                                    longitude
                                FROM voc
                                LEFT JOIN census ON census.zip_code = voc.zip_code
                                LEFT JOIN zipcode ON zipcode.zip = voc.zip_code
                                WHERE value_code = 'HF'
                                Group By voc.zip_code, value_code, census.median_income, latitude, longitude
                                Order By voc.zip_code;""")

    # Convert list of tuples into normal list
    all_hf = []
    for zip_code, denominator, avg_pmt, val_code, med_inc, latitude, longitude in result:
        all_hf_dict = {}
        all_hf_dict["Zip Code"] = str(zip_code)
        all_hf_dict["Denominator"] = float(denominator)
        all_hf_dict["Avg Payment"] = float(avg_pmt)
        all_hf_dict["Value Code"] = str(val_code)
        all_hf_dict["Median Income"] = med_inc
        all_hf_dict["Latitude"] = latitude
        all_hf_dict["Longitude"] = longitude
        all_hf.append(all_hf_dict)

    return jsonify(all_hf)

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "http://[::]:8000")
    return response

@app.route("/api/v1.0/hip_knee")
def hip_knee():
    # Create our session (link) from Python to the DB
    result = engine.execute("""SELECT voc.zip_code, 
                                    sum(denominator) as Denominator, 
                                    round(avg(payment),0) as avg_Payment, 
                                    value_code, median_income, 
                                    latitude, 
                                    longitude
                                FROM voc
                                LEFT JOIN census ON census.zip_code = voc.zip_code
                                LEFT JOIN zipcode ON zipcode.zip = voc.zip_code
                                WHERE value_code = 'HIP_KNEE'
                                Group By voc.zip_code, value_code, census.median_income, latitude, longitude
                                Order By voc.zip_code;""")

    # Convert list of tuples into normal list
    all_hk = []
    for zip_code, denominator, avg_pmt, val_code, med_inc, latitude, longitude in result:
        all_hk_dict = {}
        all_hk_dict["Zip Code"] = str(zip_code)
        all_hk_dict["Denominator"] = float(denominator)
        all_hk_dict["Avg Payment"] = float(avg_pmt)
        all_hk_dict["Value Code"] = str(val_code)
        all_hk_dict["Median Income"] = med_inc
        all_hk_dict["Latitude"] = latitude
        all_hk_dict["Longitude"] = longitude
        all_hk.append(all_hk_dict)

    return jsonify(all_hk)
def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "http://[::]:8000")
    return response

@app.route("/api/v1.0/pneumonia")
def pneumonia():
    # Create our session (link) from Python to the DB
    result = engine.execute("""SELECT voc.zip_code, 
                                    sum(denominator) as Denominator, 
                                    round(avg(payment),0) as avg_Payment, 
                                    value_code, median_income, 
                                    latitude, 
                                    longitude
                                FROM voc
                                LEFT JOIN census ON census.zip_code = voc.zip_code
                                LEFT JOIN zipcode ON zipcode.zip = voc.zip_code
                                WHERE value_code = 'PN'
                                Group By voc.zip_code, value_code, census.median_income, latitude, longitude
                                Order By voc.zip_code;""")

    # Convert list of tuples into normal list
    all_pn = []
    for zip_code, denominator, avg_pmt, val_code, med_inc, latitude, longitude  in result:
        all_pn_dict = {}
        all_pn_dict["Zip Code"] = str(zip_code)
        all_pn_dict["Denominator"] = float(denominator)
        all_pn_dict["Avg Payment"] = float(avg_pmt)
        all_pn_dict["Value Code"] = str(val_code)
        all_pn_dict["Median Income"] = med_inc
        all_pn_dict["Latitude"] = latitude
        all_pn_dict["Longitude"] = longitude
        all_pn.append(all_pn_dict)

    return jsonify(all_pn)

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "http://[::]:8000")
    return response

@app.route("/api/v1.0/heart_attack")
def heart_attack():
    # Create our session (link) from Python to the DB
    result = engine.execute("""SELECT voc.zip_code, 
                                    sum(denominator) as Denominator, 
                                    round(avg(payment),0) as avg_Payment, 
                                    value_code, median_income, 
                                    latitude, 
                                    longitude
                                FROM voc
                                LEFT JOIN census ON census.zip_code = voc.zip_code
                                LEFT JOIN zipcode ON zipcode.zip = voc.zip_code
                                WHERE value_code = 'AMI'
                                Group By voc.zip_code, value_code, census.median_income, latitude, longitude
                                Order By voc.zip_code;""")

    # Convert list of tuples into normal list
    all_ami = []
    for zip_code, denominator, avg_pmt, val_code, med_inc, latitude, longitude  in result:
        all_ami_dict = {}
        all_ami_dict["Zip Code"] = str(zip_code)
        all_ami_dict["Denominator"] = float(denominator)
        all_ami_dict["Avg Payment"] = float(avg_pmt)
        all_ami_dict["Value Code"] = str(val_code)
        all_ami_dict["Median Income"] = med_inc
        all_ami_dict["Latitude"] = latitude
        all_ami_dict["Longitude"] = longitude
        all_ami.append(all_ami_dict)

    return jsonify(all_ami)

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "http://[::]:8000")
    return response

@app.route("/api/v1.0/national_stats")
def national_stats():
    result = engine.execute("""SELECT value_code, 
                                sum(denominator) as total_cases, 
                                round(avg(payment),0) as avg_payment, 
                                max(payment) as max_payment,
                                min(payment) as min_payment,
                                round(avg(median_income)) as avg_med_inc,
                                round(max(median_income)) as max_med_inc,
                                round(min(median_income)) as min_med_inc
                            FROM voc
                            LEFT JOIN census ON census.zip_code = voc.zip_code
                            Group By value_code
                            Order By value_code; """)

    # Convert list of tuples into normal list
    all_nat = []
    for value_code,total_cases, avg_payment, max_payment, min_payment, avg_med_inc, max_med_inc, min_med_inc in result:
        all_nat_dict = {}
        all_nat_dict["Value Code"] = value_code
        all_nat_dict["Total Cases"] = total_cases
        all_nat_dict["Avg Payment"] = float(avg_payment)
        all_nat_dict["Max Payment"] = max_payment
        all_nat_dict["Min Payment"] = min_payment
        all_nat_dict["Avg Median Income"] = float(avg_med_inc)
        all_nat_dict["Max Median Income"] = float(max_med_inc)
        all_nat_dict["Min Median Income"] = float(min_med_inc)
        all_nat.append(all_nat_dict)

    return jsonify(all_nat)

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "http://[::]:8000")
    return response  

if __name__ == '__main__':
    app.run(debug=True)