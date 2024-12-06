function identity(x) {
    return x;
}
function DrawGraph() {
    points = []
    points.push( {x: 0, y: 1 });
    points.push( {x: 1, y: 1.8 });
    points.push( {x: 1.5, y: 1.9 });
    points.push( {x: 2, y: 2.1 });
    points.push( {x: 3.5, y: -0.4 });
    const canvas = document.getElementById("c01");
    const plotta = new Plotta(canvas, {
        lineDatas: [
            {
                id: 'line1',
                type: 'data',
                datas: points,
                legend: 'first',
                color: '#FF8888',
                visible: true,
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
function Switch02() {
    current = document.getElementById("ex01");
    next = document.getElementById("ex02");
    current.hidden = true;
    next.hidden = false;
}
