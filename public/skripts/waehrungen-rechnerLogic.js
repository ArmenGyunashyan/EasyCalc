mode.onclick = function() { // Deaktiviert das Erlauben von Nachkommastellen, wenn YEN umgerechnet werden soll.
    if(mode.value == '10' || mode.value == '11' || mode.value == '12') {
        var tmp = numberField.value;
        if(tmp) {
            tmp = Number.parseFloat(tmp);
            tmp = tmp.toFixed(0);
            numberField.step="1";
            numberField.value = tmp;
        }
    } else {
        numberField.step="0.01";
    }
}


function getTime() {
    var date = new Date();
    return ("(" + date.getDate() + "." + date.getMonth() + 1 + "." + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()  + ")");
}

if(inputSet && result) {

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
}