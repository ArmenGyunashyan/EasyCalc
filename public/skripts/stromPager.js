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
//-------------------------------------------------------------------------------------------
// Initialisierungs-Funktionen
//-------------------------------------------------------------------------------------------

initializeRange();          //Beschreibung bei Funktion selbst
renderPager(left, right);    //Beschreibung bei Funktion selbst

//-------------------------------------------------------------------------------------------
// Funktionen (mit Beschreibung)
//-------------------------------------------------------------------------------------------

/**
 * Object : addElement(input, inchToMetric, result)
 * Erstellt ein neues <li> Element (DOM) und füllt es mit Inhalt (Text und Function() zum Laden der Parameter in das Formular)
 * 
 * Referenz:
 *          input : number          -> Was hat der Nutzer bei seiner Rechnung angegeben
 *          mode : number           -> Welche der 12 Methoden (Select) war bei der Berechnung gewählt
 *          result : number         -> Wie lautete das Ergebnis
 *          date : string           -> An welchem Datum wurde mit dem Kurs gerechnet
 * Return:
 *          none
 */
function addElement(input1, input2, modeChoise, result) {
    var listElement = document.createElement('li');
    var elementLink = document.createElement('a');
    elementLink.href = "#";
    switch (modeChoise) {
        case "volt":
            elementLink.appendChild(document.createTextNode(input1 + " W & " + input2 + " A = " + result + " Volt"));
            break;
        case "ampere":
            elementLink.appendChild(document.createTextNode(input1 + " V & " + input2 + " W = " + result + " Ampere"));
            break;
        case "watt":
            elementLink.appendChild(document.createTextNode(input1 + " V & " + input2 + " A = " + result + " Watt"));
            break;
        default:
            done();
            break;
    }
    elementLink.onclick = function () {
        numberField1.value = input1;
        numberField2.value = input2;
        //mode.value = modeChoise;
        switch (modeChoise) {
            case "volt":
                voltBtn.checked = true;
                break;
            case "ampere":
                ampereBtn.checked = true;
                break;
            case "watt":
                wattBtn.checked = true;
                break;
            default:
                break;
        }
        //renderForm();
        resultLabel.innerHTML = ""; //Reset des alten Ergebnisses im Label
    };
    listElement.appendChild(elementLink);

    list.appendChild(listElement);
}

/**
 * Void : initializeRange()
 * Legt die Pangergrenzen beim ersten Laden der Seite fest. Das Limit ist 10 Elemente pro Page.
 * Sollte ein Array weniger als 10 Objekte haben, wird die Länge des Arrays als Obergrenze genommen.
 * Die Variablen left und right sind global und werden nicht returnt.
 * Hinweis: Das Array wird später rückwärts gelesen. Die Grenzen sind daran angepasst.
 * 
 * Return:
 *          (Globale Variablen)
 *          left : number
 *          right : number
 */
function initializeRange() {

    left = 0;
    if (chronic.length <= 10) {
        right = chronic.length;
    } else {
        right = 10;
    }
}

/**
 * Void : renderPager(left, right)
 * Eine for-Schleife die wiederholt die ein Onjekt über die Funktion "addElement" erzeugt.
 * Das neue Objekt (Element) wird danach über die DOM an das Mutter-Element <ul> angehangen.
 * Zu beginn werden die alten Elemente gelöscht.
 * Wenn es noch mehr Elemente gibt in beide Grenzrichtungen, werden Buttons eingeblendet, um das
 * Umblättern zu ermöglichen.
 * Hinweis: Das Array wird rückwärts gelesen. Die Grenzen sind daran angepasst.
 * Der letzte/aktuellste Einrtrag soll als erstes gelistet sein.
 * 
 * Referenz:
 *          left : number          -> Die untere Grenze zum Auslesen des Array (Fake-DB-Query)
 *          right : number         -> Die obere Grenze zum Auslesen des Array (Fake-DB-Query)
 * Return:
 *          none
 */
function renderPager(left, right) {
    list.innerHTML = ""; //Löschen aller aktuelle <li>'s

    for (var i = left; i < right; i++) {
        addElement(chronic[i].input1, chronic[i].input2, chronic[i].mode, chronic[i].result);
    }

    //Überprüfungen, ob Buttons benötigt werden
    if (left - 1 <= 0) { //Es gibt noch Elemente
        prevBTN.style.display = 'none';
    } else {
        prevBTN.style.display = 'block';
    }
    if (right + 1 > chronic.length) {
        nextBTN.style.display = 'none';
    } else {
        nextBTN.style.display = 'block';
    }

}
/**
 * Void : nextPage(factor)
 * Der Bereich 'left' bis 'right' wird um (factor) Einheiten nach Links verschoben (Da die Liste rückwärts gelesen wird).
 * Die Liste wird danach mit den neuen, globalen Werten 'left | right' neu gerendert, um
 * die Veränderung auch sichtbar zu machen
 * Hinweis: Das Array wird rückwärts gelesen. Die Grenzen sind daran angepasst.
 * Würden die neuen Grenzen das Array überschreiten, werden stattdssen die entsprechenden Array-Grenzen genutzt.
 * 
 * Referenz:
 *          factor : number        -> Gibt an, wie viele Elemente pro Page gerendert werden soll. (Meist 10)
 * Return:
 *          none
 */
function nextRange(factor) {
    //Right und Left werden runter gezählt (Array wird von Hinten aufgerollt)
    left = right;
    right = right + factor;
    if (left > chronic.length) { left = chronic.length; }
    if (right > chronic.length) { right = chronic.length; }
    renderPager(left, right);
}

/**
 * Void : nextPage(factor)
 * Der Bereich 'left' bis 'right' wird um (factor) Einheiten nach Rechts verschoben (Da die Liste rückwärts gelesen wird).
 * Die Liste wird danach mit den neuen, globalen Werten 'left | right' neu gerendert, um
 * die Veränderung auch sichtbar zu machen
 * Hinweis: Das Array wird rückwärts gelesen. Die Grenzen sind daran angepasst.
 * Würden die neuen Grenzen das Array überschreiten, werden stattdssen die entsprechenden Array-Grenzen genutzt.
 * 
 * Referenz:
 *          factor : number        -> Gibt an, wie viele Elemente pro Page gerendert werden soll. (Meist 10)
 * Return:
 *          none
 */
function prevRange(factor) {
    //Right und Left werden rauf gezählt (Array wird von Hinten aufgerollt)
    right = left;
    left = left - factor;
    if (left < 0) { left = 0; }
    if (right < 0) { right = 0; }
    renderPager(left, right);
}    