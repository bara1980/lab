function Run05() {
    ts = 0.0;
    te = 20.0;
    step = 0.01
    accelCoefficient = 65;
    dragCoefficient = 0.21;
    startingSpeed = 0.0;
    time = [];
    input = [];
    output = [];
    command = [];
    maxRequest = 90;
    // Read data from page
    const p_term = Number(document.getElementById("05_p").value);
    const i_term = Number(document.getElementById("05_i").value);
    const d_term = Number(document.getElementById("05_d").value);
    // Calculate results
    for (let t = ts; t <= te; t += step) {
        time.push(t);
        input.push(StepFunc(0, maxRequest, 1.0, t));
    }
    command.push(0);
    output.push(startingSpeed);
    error = 0;
    accError = 0;
    for (let i = 1; i < time.length; i++) {
        timeDelta = time[i] - time[i-1];
        previousOut = output[i-1];
        previousError = error;
        error = input[i-1] - output[i-1];
        errorChange = error - previousError;
        accError = error + accError;
        controlValue = PID(
            error,
            accError,
            errorChange,
            p_term,
            i_term,
            d_term,
            timeDelta);
        command.push(controlValue);
        output.push(
            CalculateSpeed(
                accelCoefficient,
                dragCoefficient,
                time[i-1],
                output[i-1],
                time[i],
                command[i]
            )
        );
    }
    // Plot results
    reference = [];
    result = [];
    control = [];
    for (let i = 0; i < time.length; i++) {
        reference.push( {x: time[i], y: input[i]} );
        control.push( {x: time[i], y: command[i]*100} );
        result.push( {x: time[i], y: output[i]} );
    }
    const canvas = document.getElementById("c05");
    const plotta = new Plotta(canvas, {
        lineDatas: [
            {
                id: 'reference',
                type: 'data',
                datas: reference,
                legend: 'request',
                color: '#4488FF',
                visible: true,
            },
            {
                id: 'control (%)',
                type: 'data',
                datas: control,
                legend: 'control',
                color: '#22DD44',
                visible: true,
            },
            {
                id: 'output',
                type: 'data',
                datas: result,
                legend: 'speed',
                color: '#FF88AA',
                visible: true,
            },
        ],
        graphConfig: {
            legendVisible: true,
            title: {
                visible: true,
                location: 'center',
                color: '#666666',
                text: 'Speed P controller',
            },
            grid: {
                visible: true,
                type: 'solid',
                color: '#888888',
            },
            border: {
                visible: true,
                type: 'solid',
                color: '#DDDDDD',
                width: 1,
            },
            axisX : {
                visible: true,
                type: 'number',
                label: 'time',
                color: '#666666',
                location: 'center',
                range: {
                    start: 0.0,
                    end: 20.0
                }
            },
            axisY : {
                visible: true,
                type: 'number',
                label: 'speed',
                color: '#666666',
                location: 'center',
                range: {
                    start: 0.0,
                    end: 120.0
                }
            },
            tics: {
                visible: true,
                color: '#888888',
                type: 'solid',
                value: {
                    x: 1,
                    y: 20,
                },
            },
        }
    });
    // Evaluate results
    delay(3);
    evalStart = 7.0;
    tolerance = 0.1;
    passes = true;
    switches = 0;
    dir = 1;
    maxSpeed = 0.0;
    for (let i = 0; i < time.length; i++) {
        if (time[i] >= evalStart) {
            error = output[i] - input[i];
            if (Math.abs(error) > (input[i]*tolerance))
            {
                passes = false;
            }
        }
        if (output[i] > maxSpeed) {
            maxSpeed = output[i];
        }
    }
    if (maxSpeed > maxRequest * 1.1) {
        passes = false;
    }
    if (i_term == 0) {
        passes = false;
    }
    feedback = document.getElementById("feedback");
    if (passes) {
        button = document.getElementById("show06");
        button.hidden = false;
        feedback.innerHTML = "Problem solved";
    }
    else
    {
        feedback.innerHTML =
            "You need to remain close to the target value, ensure the steady state error is zero, and minimize overshoot.";
    }
}
function Switch06() {
    current = document.getElementById("ex05");
    next = document.getElementById("ex06");
    current.hidden = true;
    next.hidden = false;
    feedback = document.getElementById("feedback");
    feedback.innerHTML = "";
}
