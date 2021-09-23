
# Code written for Centre for Neuroscience, IISc Bangalore (2021).
# @author atishay.jn under supervision of Dr. Aditya Murthy.

# This is the back-end of WebGazer built on Flask which receives 
# the eye-data from WebGazer and moves mouse pointer using the data.
#
# ----------------- SETUP ---------------------
# Please install flask, flask_cors and pyautogui using pip.
# (type "pip install flask, flask_cors, pyautogui" in the terminal").
#
# flask and flask_cors libraries are used to build the backend server.
# PyAutoGUI library is used to move mouse pointer.  
#
# Please Note: You can also use this script with other eye-tracking 
# models in that case you don't need to create a server using flask
# and can simply do the job using PyAutoGUI.


from flask import Flask, request, render_template, Response
from flask_cors import CORS
import json
import pyautogui

# Create server.
app = Flask(__name__)
CORS(app)

# Route for "POST" request.
@app.route('/moveMouse', methods = ['POST'])
def moveMouse():
    eye_data = json.loads(request.get_data())       # Receive requested data in JSON format.
    pyautogui.moveTo(eye_data["x"], eye_data["y"])  # Move Mouse Pointer.

    # print(json.loads(eye_data)) 
    # print(eye_data["x"])
    # print("------------------------------------")

    response = Response(status=200)     # Send 'OK' response to server.
    return response
    # return render_template('moveMouse.html')
    # return 'OK', 201

if __name__ == "__main__":
    # Host the server.
    app.run(debug = True, host='0.0.0.0')
    # app.run("0.0.0.0", "5000")
