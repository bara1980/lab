function identity(x) {
    return x;
}
function DrawGraph() {
    const canvas = document.getElementById("c01");
    const plotta = new Plotta(canvas, {
        lineDatas: [
            {
                id: 'line1',
                type: 'func',
                legend: 'first',
                color: '#FF8888',
                visible: true,
                func: identity,
                dotNum: 1000
            },
        ],
        graphConfig: {
            legendVisible: true,
            title: {
                visible: true,
                location: 'center',
                color: '#666666',
                text: 'plotta.ts',
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
        },
    });
    button = document.getElementById("show02");
    button.hidden = false;
}
