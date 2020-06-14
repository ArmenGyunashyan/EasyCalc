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

    initializeRange(15);          //Beschreibung bei Funktion selbst
    renderPager(left,right);    //Beschreibung bei Funktion selbst

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
    function addElement(input, modeChoise, result, date) {
        var listElement = document.createElement('li');
            var elementLink = document.createElement('a');
            elementLink.href = "#";
            switch(modeChoise) {
                case 1: //EUR > USD
                    elementLink.appendChild(document.createTextNode(input + " EUR = " + result + " USD " + date));
                break;
                case 2: //EUR > GBP
                    elementLink.appendChild(document.createTextNode(input + " EUR = " + result + " GBP " + date));
                break;
                case 3: //EUR > YEN
                    elementLink.appendChild(document.createTextNode(input + " EUR = " + result + " YEN " + date));
                break;
                case 4: //USD > EUR
                    elementLink.appendChild(document.createTextNode(input + " USD = " + result + " EUR " + date));
                break;
                case 5: //USD > GBP
                    elementLink.appendChild(document.createTextNode(input + " USD = " + result + " GBP " + date));
                break;
                case 6: //USD > YEN
                    elementLink.appendChild(document.createTextNode(input + " USD = " + result + " YEN " + date));
                break;
                case 7: //GBP > EUR
                    elementLink.appendChild(document.createTextNode(input + " GBP = " + result + " EUR " + date));
                break;
                case 8: //GBP > USD
                    elementLink.appendChild(document.createTextNode(input + " GBP = " + result + " USD " + date));
                break;
                case 9: //GBP > YEN
                    elementLink.appendChild(document.createTextNode(input + " GBP = " + result + " YEN " + date));
                break;
                case 10: //YEN > EUR
                    elementLink.appendChild(document.createTextNode(input + " YEN = " + result + " EUR " + date));
                break;
                case 11: //YEN > USD
                    elementLink.appendChild(document.createTextNode(input + " YEN = " + result + " USD " + date));
                break;
                case 12: //YEN > GBP
                    elementLink.appendChild(document.createTextNode(input + " YEN = " + result + " GBP " + date));
                break;
                default:
                    done();
                break;
            }
            elementLink.onclick = function() {
                numberField.value=input;
                mode.value = modeChoise;
                resultLabel.innerHTML=""; //Reset des alten Ergebnisses im Label
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
    function initializeRange(factor) {
        
       left = 0;
       if(chronic.length <= factor) {
            right = chronic.length;
       } else {
           right = factor;
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

        if(right == 0 && left == 0) {
            verlaufHeader.style.display = 'none';
        } else {
            verlaufHeader.style.display = 'block';
            
        }

        list.innerHTML=""; //Löschen aller aktuelle <li>'s
        
        for(var i = left; i < right; i++) {
                addElement(chronic[i].input, chronic[i].mode,chronic[i].result,chronic[i].date);
        }

        //Überprüfungen, ob Buttons benötigt werden
        if(left-1 <= 0) { //Es gibt noch Elemente
            prevBTN.style.display = 'none';
        } else {
            prevBTN.style.display = 'block';
        }
        if(right + 1 > chronic.length) {
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
        if(left > chronic.length) {left = chronic.length;}
        if(right > chronic.length) {right = chronic.length;}
        renderPager(left,right);
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
        if(left < 0) {left = 0;}
        if(right < 0) {right = 0;}
        renderPager(left,right);
    }    