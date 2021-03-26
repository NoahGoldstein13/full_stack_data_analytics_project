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
    result = engine.execute("""SELECT voc.zip_code, sum(denominator) as Denominator, round(avg(payment),0) as avg_Payment, value_code, median_income
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
    session = Session(engine)
    results = session.query(Measurement.station, func.count(Measurement.station)).group_by(Measurement.station).order_by(func.count(Measurement.station).desc()).all()
    session.close()    

    all_stations = []
    for station, count in results:
        all_stations_dict = {}
        all_stations_dict["Station ID"] = station
        all_stations_dict["Count of Observations"] = count
        all_stations.append(all_stations_dict)

    return jsonify(all_stations)

@app.route("/api/v1.0/pneumonia")
def pneumonia():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    
    results = most_active_temp = session.query(Measurement.date, Measurement.tobs).\
                filter(Measurement.station == 'USC00519281').all()
    
    session.close()
    
    all_tobs = []
    for date, tobs in results:
        all_tobs_dict = {}
        all_tobs_dict["Date"] = date
        all_tobs_dict["Temperature Observation"] = tobs
        all_tobs.append(all_tobs_dict)

    return jsonify(all_tobs)

@app.route("/api/v1.0/heart_attack")
def calc_start_temps(start):
    session = Session(engine)
    start_date = dt.datetime.strptime(start, '%Y-%m-%d')

    start_results = session.query(func.avg(Measurement.tobs),func.max(Measurement.tobs),func.min(Measurement.tobs).\
               filter(Measurement.date >= start_date))
    session.close()

    start_tobs_df = []   
    for tmax,tmin,tavg in start_results:
       start_tobs_dict = {}
       start_tobs_dict['Start_Date'] = start_date
       start_tobs_dict["tMin"] = float(tmin)                     
       start_tobs_dict["tMax"] = float(tmax)
       start_tobs_dict["tAvg"] = float(tavg)
       start_tobs_df.append(start_tobs_dict)
    
    return jsonify(start_tobs_df)

@app.route("/api/v1.0/min_max_avg/<start>/<end>")
def start_end(start, end):
    session = Session(engine)

    start_date = dt.datetime.strptime(start, '%Y-%m-%d')
    end_date = dt.datetime.strptime(end, "%Y-%m-%d")

    # query data for the start date value
    results = session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).filter(Measurement.date >= start_date).filter(Measurement.date <= end_date)

    session.close()

    # Create a list to hold results
    start_tobs_df = []
    for tmin, tmax, tavg in results:
       start_tobs_dict = {}
       start_tobs_dict['Start_Date'] = start_date
       start_tobs_dict['End_Date'] = end_date
       start_tobs_dict["tMin"] = float(tmin)                     
       start_tobs_dict["tMax"] = float(tmax)
       start_tobs_dict["tAvg"] = float(tavg)
       start_tobs_df.append(start_tobs_dict)

    # jsonify the result
    return jsonify(start_tobs_df)


if __name__ == '__main__':
    app.run(debug=True)