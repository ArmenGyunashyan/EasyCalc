/*if(mode) {
    renderForm(mode);
} else {
    renderForm("volt");
}*/
renderForm(mode);

voltBtn.onclick = function () {
    mode = "volt";
    renderForm(mode);
    resultLabel.innerHTML="";
    numberField1.value = "";
    numberField2.value = "";
};
ampereBtn.onclick = function () {
    mode = "ampere";
    renderForm(mode);
    resultLabel.innerHTML="";
    numberField1.value = "";
    numberField2.value = "";
};
wattBtn.onclick = function () {
    mode = "watt";
    renderForm(mode);
    resultLabel.innerHTML="";
    numberField1.value = "";
    numberField2.value = "";
};
/**
 * Neues Rendern aller FormularElemente, da die Auswahl des Modus die Beschriftung ändern muss
 */
function renderForm(mode) {

    switch (mode) {
        case "volt":
            input1Label.innerHTML = "Watt (W): ";
            input2Label.innerHTML = "Ampere (A): ";
            break;
        case "ampere":
            input1Label.innerHTML = "Volt (V): ";
            input2Label.innerHTML = "Watt (W): ";
            break;
        case "watt":
            input1Label.innerHTML = "Volt (V): ";
            input2Label.innerHTML = "Ampere (A): ";
            break;
        default:
            input1Label.innerHTML = "Watt (W): ";
            input2Label.innerHTML = "Ampere (A): ";
            break;
    };


}

if (inputSet && result) {
    numberField1.value = inputSet.input1;
    numberField2.value = inputSet.input2;

    //result fehlt noch
    switch (inputSet.mode) {
        case "volt":
            resultLabel.textContent = result + " Volt";
            voltBtn.checked = true;
            break;
        case "ampere":
            resultLabel.textContent = result + " Ampere";
            ampereBtn.checked = true;
            break;
        case "watt":
            resultLabel.textContent = result + " Watt";
            wattBtn.checked = true;
            break;
        default:
            break;
    }
    renderForm(inputSet.mode);

}

