 // Anzeige des Ergebnisses auf dem 'resultLabel' (DOM)
 if(result != null) {
    if(inputSet.inchToMetric == 'true') {
        resultLabel.innerHTML=result + " cm";
        
    } else {
        resultLabel.innerHTML=result + " zoll";
    }
// Befüllen der Formular-Elemente------------------------------------------------------------
// Durch den POST wird das Formular geleert. Die Variablen lesen wir hier aber wieder ein
    
    numberField.value=inputSet.input;
    if(inputSet.inchToMetric == 'true') {
        inchToMetricRadio.checked = true;
    } else {
        metricToInchRadio.checked = true;
    }
    
}