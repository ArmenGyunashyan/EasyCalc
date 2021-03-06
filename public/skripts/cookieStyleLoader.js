/**
     * Der Code musste hier angepasst werden (teilweise redundant), da Chrom und Edge anders mit Cookies umgehen, als Opera.
     * Chrom kann in Cookies nur schreiben und Sie nicht richtig lesen.
     */
    const stylesheet = document.getElementById("sheet");
    const checkBox = document.getElementById("styleChecker");
    const dropbtn = document.getElementsByClassName("dropbtn");

    if(window.location.pathname != "/index.html" && window.location.pathname != "/index" && window.location.pathname != "/") { // Statistiken werden mit Dummy-Daten gefüllt, wenn man nicht auf der STartseite ist
        var statistics = {
            measure: 0,
            money: 0,
            energy: 0
        }
    }

    
    
    if(style == 'dunkel') {
        checkBox.checked = false;
    } else {
        checkBox.checked = true;
    }
    

    checkBox.onclick = function () {

        

        if (this.checked) {
            document.cookie = "style=hell";
            stylesheet.href = "css/default.css";
            dropbtn[0].src="images/ThreeLines.svg";
            
            if(window.location.pathname == "/index.html" || window.location.pathname == "/index" || window.location.pathname == "/") {
            var chartDefault = new CanvasJS.Chart("chartContainer", {
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
                            color: "#4aada0",
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
            
            chartLoad(chartDefault);
        }
            
        } else {
            document.cookie = "style=dunkel";
            stylesheet.href = "css/dark.css";
            dropbtn[0].src="images/ThreeLinesDark.svg";
            
            if(window.location.pathname == "/index.html" || window.location.pathname == "/index" || window.location.pathname == "/") {
        
            var chartDark = new CanvasJS.Chart("chartContainer", {
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
                            color: "#5fd7c8",
                            indexLabelFontColor: "lightgray",
                            name: "Maßeinheitenrechner"
                        },
                        {
                            y: statistics.energy,
                            color: "#179180",
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
            
                chartLoad(chartDark);
        }

        }
    
    }