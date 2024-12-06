function Run03() {
    ts = 0.0;
    te = 20.0;
    step = 0.01
    accelCoefficient = 25;
    dragCoefficient = 0.15;
    startingSpeed = 0.0;
    time = [];
    input = [];
    output = [];
    command = [];
    // Read data from page
    const p_term = Number(document.getElementById("03_p").value);
    // Calculate results
    for (let t = ts; t <= te; t += step) {
        time.push(t);
        input.push(StepFunc(0, 60, 1.0, t));
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
            0,
            0,
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
    const canvas = document.getElementById("c03");
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
    for (let i = 0; i < time.length; i++) {
        if (time[i] >= evalStart) {
            error = output[i] - input[i];
            if (Math.abs(error) > (input[i]*tolerance))
            {
                passes = false;
            }
            if (dir == 1 && output[i] > output[i-1]) {
                switches++;
                dir = 0;
            } else if (dir == 0 && output[i] < output[i-1]) {
                switches++;
                dir = 1;
            }
        }
    }
    if (switches > 5) {
        passes = false;
    }
    feedback = document.getElementById("feedback");
    if (passes) {
        button = document.getElementById("show04");
        button.hidden = false;
        feedback.innerHTML = "Problem solved";
    }
    else
    {
        feedback.innerHTML =
            "You need to remain close to the target value and avoid high-frequency vibration.";
    }
}
function Switch04() {
    current = document.getElementById("ex03");
    next = document.getElementById("ex04");
    current.hidden = true;
    next.hidden = false;
    feedback = document.getElementById("feedback");
    feedback.innerHTML = "";
}
