function StepFunc(low, high, cutoff, t) {
    if (t > cutoff) {
        return high;
    }
    return low;
}
function Run01() {
    ts = 0.0;
    te = 20.0;
    step = 0.01
    time = [];
    reference = [];
    input = [];
    output = [];
    // Read data from page
    const off_value = document.getElementById("01_off").value;
    const on_value = document.getElementById("01_on").value;
    const cutoff_value = document.getElementById("01_cutoff").value;
    // Calculate results
    for (let t = ts; t <= te; t += step) {
        time.push(t);
        input.push(StepFunc(0, 60, 1.0, t));
    }
    // Plot results
    for (let i = 0; i < time.length; i++) {
        reference.push( {x: time[i], y: input[i]} );
        output.push( {x: time[i], y: 0.0} );
    }
    const canvas = document.getElementById("c01");
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
                id: 'output',
                type: 'data',
                datas: output,
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
    button = document.getElementById("show02");
    button.hidden = false;
}
function Switch02() {
    current = document.getElementById("ex01");
    next = document.getElementById("ex02");
    current.hidden = true;
    next.hidden = false;
}
