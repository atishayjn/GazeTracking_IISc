window.onload = async function() {

    webgazer.params.showVideoPreview = true;


    //start the webgazer tracker
    await webgazer.setRegression('ridge') /* currently must set regression and tracker */
        //.setTracker('clmtrackr')
        .setGazeListener(function(eye_data, clock) {

            if (eye_data) {
                $.ajax({
                    type : 'POST',
                    // url : "{{url_for('moveMouse')}}",
                    url : "http://192.168.43.245:5000/moveMouse",
                    data : JSON.stringify({x: eye_data.x, y: eye_data.y})
                  });
            }

            if (eye_data) {
                // console.log({{url_for('moveMouse')}});
                console.log(eye_data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
                console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
                // console.log(data.y);
                // client.write(data);
            }
        })
        .saveDataAcrossSessions(true)
        .begin();
        webgazer.showVideoPreview(true) /* shows all video previews */
            .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
            .applyKalmanFilter(true); /* Kalman Filter defaults to on. Can be toggled by user. */

    //Set up the webgazer video feedback.
    var setup = function() {

        //Set up the main canvas. The main canvas is used to calibrate the webgazer.
        var canvas = document.getElementById("plotting_canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
    };
    setup();

};

// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = true;

window.onbeforeunload = function() {
    webgazer.end();
}

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
function Restart(){
    document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
    webgazer.clearData();
    ClearCalibration();
    PopUpInstruction();
}
