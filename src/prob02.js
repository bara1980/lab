function Run02() {
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
    const offValue = Number(document.getElementById("02_off").value);
    const onValue = Number(document.getElementById("02_on").value);
    const offOffset = Number(document.getElementById("02_offt").value);
    const onOffset = Number(document.getElementById("02_ont").value);
    // Calculate results
    for (let t = ts; t <= te; t += step) {
        time.push(t);
        input.push(StepFunc(0, 60, 1.0, t));
    }
    command.push(offValue);
    output.push(startingSpeed);
    for (let i = 1; i < time.length; i++) {
        controlValue = OnOffWithHysteresisControl(
            command[i-1],
            offValue, offOffset,
            onValue, onOffset,
            output[i-1] - input[i])
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
    const canvas = document.getElementById("c02");
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
                text: 'Speed On/Off controller',
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
    // TODO: Real evaluation
    evalStart = 7.0;
    tolerance = 0.1;
    passes = true;
    for (let i = 0; i < time.length; i++) {
        if (time[i] >= evalStart) {
            error = output[i] - input[i];
            if (Math.abs(error) > (input[i]*tolerance))
            {
                passes = false;
            }
        }
    }
    feedback = document.getElementById("feedback");
    if (passes) {
        button = document.getElementById("show02");
        button.hidden = false;
        feedback.innerHTML = "Problem solved";
    }
    else
    {
        feedback.innerHTML =
            "Not getting to the result fast enough, please try again.";
    }
}
function Switch03() {
    current = document.getElementById("ex01");
    next = document.getElementById("ex02");
    current.hidden = true;
    next.hidden = false;
    feedback = document.getElementById("feedback");
    feedback.innerHTML = "";
}