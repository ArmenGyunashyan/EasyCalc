if(style == 'hell') {
    var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    backgroundColor: "transparent",
    color: "red",
    title: {
        text: "Nutzung der Rechner",
        fontFamily: "Orbitron",
        fontColor: "black",
    },
    legend: {
        verticalAlign: "bottom",
        fontColor: "black",
        markerMargin: 8,
        fontFamily: "Orbitron",
    },
    data: [{
        type: "pie",
        showInLegend: true,
        startAngle: 240,
        yValueFormatString: "#\"\"",
        indexLabel: "{y}",
        legendText: "{name}",
        dataPoints: [
            {
                y: statistics.measure,
                color: "#179180",
                indexLabelFontColor: "black",
                name: "Maßeinheitenrechner"
            },
            {
                y: statistics.energy,
                color: "#2b6059",
                indexLabelFontColor: "black",
                name: "Stromrechner"
            },
            {
                y: statistics.money,
                color: "#0f4f46",
                indexLabelFontColor: "black",
                name: "Währungsrechner"
            },
        ]
    }]
});
} else {
    var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    backgroundColor: "transparent",
    color: "red",
    title: {
        text: "Nutzung der Rechner",
        fontFamily: "Orbitron",
        fontColor: "lightgray",
    },
    legend: {
        verticalAlign: "bottom",
        fontColor: "lightgray",
        markerMargin: 8,
        fontFamily: "Orbitron",
    },
    data: [{
        type: "pie",
        showInLegend: true,
        startAngle: 240,
        yValueFormatString: "#\"\"",
        indexLabel: "{y}",
        legendText: "{name}",
        dataPoints: [
            {
                y: statistics.measure,
                color: "#179180",
                indexLabelFontColor: "lightgray",
                name: "Maßeinheitenrechner"
            },
            {
                y: statistics.energy,
                color: "#2b6059",
                indexLabelFontColor: "lightgray",
                name: "Stromrechner"
            },
            {
                y: statistics.money,
                color: "#0f4f46",
                indexLabelFontColor: "lightgray",
                name: "Währungsrechner"
            },
        ]
    }]
});
}

chartLoad(chart);
function chartLoad(chart) {
    chart.render();
}