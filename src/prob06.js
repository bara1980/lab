function Run06() {
    ts = 0.0;
    te = 20.0;
    step = 0.01
    accelCoefficient = 35;
    dragCoefficient = 0.21;
    startingSpeed = 0.0;
    time = [];
    input = [];
    output = [];
    command = [];
    step1 = 55;
    step2 = -55;
    step3 = 70;
    // Read data from page
    const p_term = Number(document.getElementById("06_p").value);
    const i_term = Number(document.getElementById("06_i").value);
    const d_term = Number(document.getElementById("06_d").value);
    // Calculate results
    for (let t = ts; t <= te; t += step) {
        time.push(t);
        i1 = StepFunc(0, step1, 1.0, t);
        i2 = StepFunc(0, step2, 10.0, t);
        i3 = StepFunc(0, step3, 14.0, t);
        input.push(i1 + i2 + i3);
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
    const canvas = document.getElementById("c06");
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
    // Real evaluation
    evalStart = 7.0;
    totalError = 0;
    maxTotalError = 30;
    for (let i = 0; i < time.length; i++) {
        if (time[i] >= evalStart) {
            error = Math.abs(input[i] - output[i]) * (time[i] - time[i-1]);
            totalError += error;
        }
    }
    passes = true;
    if (totalError > maxTotalError) {
        passes = false
    }
    feedback = document.getElementById("feedback");
    if (passes) {
        button = document.getElementById("show07");
        button.hidden = false;
        feedback.innerHTML = "Problem solved";
    }
    else
    {
        feedback.innerHTML =
            "Total error too high. Currently: " + totalError +
            " Acceptable: " + maxTotalError;
    }
}
function Switch07() {
    current = document.getElementById("ex06");
    next = document.getElementById("ex07");
    current.hidden = true;
    next.hidden = false;
    feedback = document.getElementById("feedback");
    feedback.innerHTML = "";
}
