/*
// Rechner
    const mode = document.getElementById('mode');                   //Dropdown-Selektor
    const numberField = document.getElementById('numberField');     //Eingabefeld
    const resultLabel = document.getElementById('resultLabel');
    // Antwort vom Backend
    var result;
    var inputSet;
    <% if(locals.result) {%>result = <%= result%>;<%} %>
    <% if(locals.inputSet) {%>inputSet = <%-JSON.stringify(inputSet)%>;<% } %>
    //Pager
    <%
        var tmp = "[";
        var match = 0;
        for(var i = chronic.length-1; i >= 0; i--) {
            if(chronic[i].user == activeSession.username) {
                tmp = tmp + JSON.stringify(chronic[i]) + ",";
                ++match;
            }
        }
        tmp = tmp.substring(0, tmp.length-1) + "]";
        if(match > 0) {
            chronic = tmp;
        } else {
            chronic = null; //Keine passenden Nutzerdaten gefunden
        }
    %>
    var chronic<% if(activeSession.loggedin && chronic) { %> = JSON.parse(<%-JSON.stringify(chronic)%>);<% } else { %> = "";<% } %> // Ich weis dass das hier sehr schwer zu verstehen ist.
    var left = 0;
    var right = 0;
    const list = document.getElementById('list');
    const nextBTN = document.getElementById('nextBTN');
    const prevBTN = document.getElementById('prevBTN');
    nextBTN.style.display = 'none';
    prevBTN.style.display = 'none';
*/

mode.onclick = function() { // Deaktiviert das Erlauben von Nachkommastellen, wenn YEN umgerechnet werden soll.
    if(mode.value == '10' || mode.value == '11' || mode.value == '12') {
        var tmp = numberField.value;
        if(tmp) {
            tmp = Number.parseFloat(tmp);
            tmp = tmp.toFixed(0);
            numberField.value = tmp;
        }
        numberField.step="1";
    } else {
        numberField.step="0.01";
    }
}


if(inputSet && result) { //Anzeige des Ergebnisses auf der Webseite

    switch(inputSet.mode) {
        case 1: //EUR > USD
            resultLabel.innerHTML = inputSet.input + " EUR = " + result + " USD ";
        break;
        case 2: //EUR > GBP
            resultLabel.innerHTML = inputSet.input + " EUR = " + result + " GBP ";
        break;
        case 3: //EUR > YEN
            resultLabel.innerHTML = inputSet.input + " EUR = " + result + " YEN ";
        break;
        case 4: //USD > EUR
            resultLabel.innerHTML = inputSet.input + " USD = " + result + " EUR ";
        break;
        case 5: //USD > GBP
            resultLabel.innerHTML = inputSet.input + " USD = " + result + " GBP ";
        break;
        case 6: //USD > YEN
            resultLabel.innerHTML = inputSet.input + " USD = " + result + " YEN ";
        break;
        case 7: //GBP > EUR
            resultLabel.innerHTML = inputSet.input + " GBP = " + result + " EUR ";
        break;
        case 8: //GBP > USD
            resultLabel.innerHTML = inputSet.input + " GBP = " + result + " USD ";
        break;
        case 9: //GBP > YEN
            resultLabel.innerHTML = inputSet.input + " GBP = " + result + " YEN ";
        break;
        case 10: //YEN > EUR
            resultLabel.innerHTML = inputSet.input + " YEN = " + result + " EUR ";
        break;
        case 11: //YEN > USD
            resultLabel.innerHTML = inputSet.input + " YEN = " + result + " USD ";
        break;
        case 12: //YEN > GBP
            resultLabel.innerHTML = inputSet.input + " YEN = " + result + " GBP ";
        break;
        default:
            done();
        break;
    }
    numberField.value = inputSet.input;
    mode.value = inputSet.mode;
}