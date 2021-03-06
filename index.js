//Imports (da es JS ist, sind es Variablen)
const express = require('express'); // Express-Framework
const path = require('path'); // Keine Ahnung (wird aber bei fast allem benötigt)
const session = require('express-session'); // Session-Unterstützung für das Login-System. (Alle Infoematiionen über einen Nutzer sind später im Session-Objekt)
const bodyParser = require('body-parser'); // Zum Extrahieren von Html-Form-Daten (Formulardaten aus z.B. Inputfeldern)
const cookieParser = require('cookie-parser');
const { localsName } = require('ejs');
const { url } = require('inspector');



//Variablen für die Session und die (Fake)Datenbank-------------------
var statistics = { measure: 1120, money: 420, energy: 280 };
var EURtoUSD = 1.1321; //Wechselkurse: x / var
var EURtoGBP = 0.8924; //Wechselkurse x * var
var EURtoYEN = 121.68; //Wechselkurse x * var
var USDtoGBP = 0.7854; //Wechselkurse x * var
var USDtoYEN = 106.983;//Wechselkurse x * var
var GBPtoYEN = 136.28; //Wechselkurse x * var
var Kurse = {
    EURtoUSD: EURtoUSD,
    EURtoGBP: EURtoGBP,
    EURtoYEN: EURtoYEN,
    USDtoGBP: USDtoGBP,
    USDtoYEN: USDtoYEN,
    GBPtoYEN: GBPtoYEN
};

//Alter Wechselkurs
var OldEURtoUSD = 1.1083;
var OldEURtoGBP = 0.7924;
var OldEURtoYEN = 122.68;
var OldUSDtoGBP = 0.8854;
var OldUSDtoYEN = 107.983;
var OldGBPtoYEN = 130.28;
var OldKurse = {
    EURtoUSD: OldEURtoUSD,
    EURtoGBP: OldEURtoGBP,
    EURtoYEN: OldEURtoYEN,
    USDtoGBP: OldUSDtoGBP,
    USDtoYEN: OldUSDtoYEN,
    GBPtoYEN: OldGBPtoYEN
};

const users = [
    {
        username: "root",
        password: "admin"
    },
    {
        username: "test",
        password: "test"
    },
    {
        username: "Yggdrahl",
        password: "1234"
    }
];
var chronicMeasure = [
    {
        user: "root",
        inchToMetric: true,
        input: 14,
        result: 14.2
    },
    {
        user: "test",
        inchToMetric: false,
        input: 5,
        result: 12.7
    },
    {
        user: "root",
        inchToMetric: false,
        input: 13,
        result: 13.6
    },
    {
        user: "root",
        inchToMetric: false,
        input: 12,
        result: 12.9
    },
    {
        user: "root",
        inchToMetric: true,
        input: 11,
        result: 11.5
    },
    {
        user: "root",
        inchToMetric: false,
        input: 10,
        result: 10.3
    },
    {
        user: "root",
        inchToMetric: true,
        input: 9,
        result: 63.5
    },
    {
        user: "root",
        inchToMetric: true,
        input: 8,
        result: 8.5
    },
    {
        user: "root",
        inchToMetric: false,
        input: 7,
        result: 7.3
    },
    {
        user: "root",
        inchToMetric: true,
        input: 6,
        result: 6.5
    },
    {
        user: "root",
        inchToMetric: true,
        input: 5,
        result: 5.4
    },
    {
        user: "root",
        inchToMetric: false,
        input: 4,
        result: 4.7
    },
    {
        user: "root",
        inchToMetric: true,
        input: 3,
        result: 3.5
    },
    {
        user: "root",
        inchToMetric: true,
        input: 2,
        result: 2.54
    },
    {
        user: "root",
        inchToMetric: false,
        input: 1,
        result: 1.1
    },
    {
        user: "root",
        inchToMetric: true,
        input: 11,
        result: 11.5
    },
    {
        user: "root",
        inchToMetric: false,
        input: 10,
        result: 10.3
    },
    {
        user: "root",
        inchToMetric: true,
        input: 9,
        result: 63.5
    },
    {
        user: "root",
        inchToMetric: true,
        input: 8,
        result: 8.5
    },
    {
        user: "root",
        inchToMetric: false,
        input: 7,
        result: 7.3
    },
    {
        user: "root",
        inchToMetric: true,
        input: 6,
        result: 6.5
    },
    {
        user: "root",
        inchToMetric: true,
        input: 5,
        result: 5.4
    },
    {
        user: "root",
        inchToMetric: false,
        input: 4,
        result: 4.7
    },
    {
        user: "root",
        inchToMetric: true,
        input: 3,
        result: 3.5
    },
    {
        user: "root",
        inchToMetric: true,
        input: 2,
        result: 2.54
    },
    {
        user: "root",
        inchToMetric: false,
        input: 1,
        result: 1.1
    }
];
var chronicMoney = [
    {
        user: "root",
        mode: 3,
        input: 1,
        result: 1.1,
        date: getTime()
    }
];
var chronicEnergy = [
    {
        user: "root",
        mode: "volt",
        input1: 1000,
        input2: 4,
        result: 250
    }
];

//--------------------------------------------


// Die Hauptanwendung wird gestartet
const app = express();

app.use(cookieParser());

//--------------------------------------------------
//Login-Middeware (nicht die Authetifikations-Überprüfung)
//--------------------------------------------------

app.use(session({
    secret: 'secret', //Hier kommt eigentlich ein Hashwert hin
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extendet: true }));
app.use(bodyParser.json());

// Abfangen des POST (/login.html/auth)
app.post('/login.html/auth', function (req, res) {
    var user = req.body.username; //Auslesen der Variable 'username' aus dem Body des Http-Requests (hier als -> var res)
    var pw = req.body.password; //Auslesen der Variable 'password' aus dem Body des Http-Requests (hier als -> var res)

    var userDbIndex = -1; //Speicherort des Users in der UserDB (hier nur ein cosnt Array)

    if (user && pw) {
        for (i = 0; i < users.length; i++) {
            if (users[i].username == user) {
                userDbIndex = i;
            }
        }

        if (userDbIndex > -1) { //Username in der DB (Array) gefunden
            if (user == users[userDbIndex].username && pw == users[userDbIndex].password) {
                req.session.loggedin = true;
                req.session.username = user; //Die Variable {var req}.session ist von über all aus zugreifbar (wiie ein globaler Cookie)

                res.redirect('/');
            } else {
                res.send('Passwort oder Nutzername falsch!');
            }
            res.end();

        } else {
            res.send('Passwort oder Nutzername falsch!');
        }
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }

});

//--------------------------------------------------
//Authetifikations-Überprüfung
//--------------------------------------------------

function isAuth(req, res, next) {
    if (req.session.loggedin != true) {
        next(); //Next beendet die Funktion nur (So wie z.B. return null;)
    } else {
        res.redirect('/');
    }
}
// Welche URL soll 'belauscht' werden?
/**
 * Wird die URL aufgerufen, wird die Funktion "isAuth()" gestartet. Diese leitet, bei aktiver Session, zur Index-Seite zurück
 */
//app.get('/login.html', isAuth); //Funktion verlagert
//app.get('/login', isAuth);

//--------------------------------------------------
// Router + RenderEngine + Var-Parsing
//--------------------------------------------------
/**
 * Hier werden alle URL's die der Client aufrufen kann "belauscht" (Funktionen ausführen, wenn URL aufgerufen wird).
 * Wird eine URL aufgerufen, wird die Anfrage über die RenderEngine umgeleitet, die dann ein HTML-Code für die URL
 * generiert und übergibt. Die Seite wird also beim URL Aufruf dynamisch durch EJS generiert.
 * Dies wird benötigt, da wir Variablen für die Webseite übergeben wollen.
 * Dazu gehören Information zur aktuellen Session, Statistiken für PieCharts, Listen und Cookies.
 * Zuvor wird überprüft, ob überhaupt ein Cookie existiert.
 * 
 * Syntax -> app.get('URL', function(req, res) {... Auszuführen beim Aufruf von URL})
 */
app.get('/', function (req, res) {
    if (!req.cookies.style) {            //Existens des Cookies 'style' wird überprüft
        res.cookie('style', 'hell');    //Der Cookie wird erzeugt und beim Client gespeichert (Dennoch wird er später übermittelt, da er für die RenderEngine benötigt wird -> Bessere Performance als JavaScript)
    }
    //res.clearCookie('style');
    res.render('index', { activeSession: req.session, statistics, style: req.cookies.style });  // Erst jetzt kommt die Renderengine + Übergabe aller wichtigen Variablen und Objekten
});
app.get('/index.html', function (req, res) {
    if (!req.cookies.style) {
        res.cookie('style', 'hell');
    }
    res.render('index', { activeSession: req.session, statistics, style: req.cookies.style });
});
app.get('/index', function (req, res) {
    if (!req.cookies.style) {
        res.cookie('style', 'hell');
    }
    res.render('index', { activeSession: req.session, statistics, style: req.cookies.style });
});
app.get('/kurs.html', function (req, res) {
    res.render('kurs', { activeSession: req.session, Kurse: Kurse, OldKurse: OldKurse, style: req.cookies.style });
});
app.get('/kurs', function (req, res) {
    res.render('kurs', { activeSession: req.session, Kurse: Kurse, OldKurse: OldKurse, style: req.cookies.style });
});
app.get('/info.html', function (req, res) {
    res.render('info', { activeSession: req.session, style: req.cookies.style });
});
app.get('/info', function (req, res) {
    res.render('info', { activeSession: req.session, style: req.cookies.style });
});
app.get('/impressum.html', function (req, res) {
    res.render('impressum', { activeSession: req.session, style: req.cookies.style });
});
app.get('/impressum', function (req, res) {
    res.render('impressum', { activeSession: req.session, style: req.cookies.style });
});
app.get('/masseinheiten-rechner.html', function (req, res) {
    res.render('masseinheiten-rechner', { activeSession: req.session, chronic: chronicMeasure, style: req.cookies.style });
});
app.get('/masseinheiten-rechner', function (req, res) {
    res.render('masseinheiten-rechner', { activeSession: req.session, chronic: chronicMeasure, style: req.cookies.style });
});
app.get('/waehrungen-rechner.html', function (req, res) {
    res.render('waehrungen-rechner', { activeSession: req.session, chronic: chronicMoney, style: req.cookies.style });
});
app.get('/waehrungen-rechner', function (req, res) {
    res.render('waehrungen-rechner', { activeSession: req.session, chronic: chronicMoney, style: req.cookies.style });
});
app.get('/strom-rechner.html', function (req, res) {
    res.render('strom-rechner', { activeSession: req.session, chronic: chronicEnergy, style: req.cookies.style });
});
app.get('/strom-rechner', function (req, res) {
    res.render('strom-rechner', { activeSession: req.session, chronic: chronicEnergy, style: req.cookies.style });
});


app.get('/login.html', isAuth, function (req, res) {
    res.render('login', { activeSession: req.session, style: req.cookies.style });
});
app.get('/login', isAuth, function (req, res) {
    res.render('login', { activeSession: req.session, style: req.cookies.style });
});



app.get('/test', function (req, res) {
    res.render('test', { activeSession: req.session, style: req.cookies.style });
});

/**
 * Die URL 'api/measure' stellt die JSON-Daten über die Masseinheiten-Verlaufschronik bereit. Diese können dann mit Ajax angefordert werden
 * (Bei den anderen Rechner wurde dies simpler mit ejs gemacht)
 */
app.get('/api/measure/', function (req, res) {
    //res.writeHead(200, {'Content-Type': 'application/json'});

    if (req.session.loggedin) {
        var resultJson;
        var jsonString = '[';
        var matches = 0;

        for (var i = chronicMeasure.length - 1; i >= 0; i--) {
            if (chronicMeasure[i].user == req.session.username) {
                ++matches;
                jsonString = jsonString + JSON.stringify(chronicMeasure[i]) + ',';
            }
        }
        jsonString = jsonString.substring(0, jsonString.length - 1) + ']';
        if (matches > 0) {
            resultJson = JSON.parse(jsonString);
        }

        if (resultJson) {

            var left = Number.parseInt(req.query.left);
            var right = Number.parseInt(req.query.right);
            
            if (right > resultJson.length) {
                right = resultJson.length;
            }
            if (left < 0) {
                left = 0;
            }
            if (left > right) {
                left = right;
            }
            

            var resultFiltered = '[';

            for (var i = left; i < right; i++) {

                resultFiltered = resultFiltered + JSON.stringify(resultJson[i]) + ',';
            }
            resultFiltered = resultFiltered.substring(0, resultFiltered.length - 1) + ']';
            if (left < right) {
                resultFiltered = JSON.parse(resultFiltered);
            } else {
                resultFiltered = null;
            }

        }

    }



    res.end(JSON.stringify(resultFiltered));

});
//--------------------------------------------------


app.get('/logout', function (req, res, done) { //Ausloggen über eine URL (nicht über HTTP Post)
    req.session.loggedin = false;
    req.session.username = null;
    req.session.password = null;
    res.redirect('/');
    done();
});
//=============================================================================================================
//  x     *       +       x     *       +       x     *       +       x     *       +       x     *       +       
//Rechner-Logiken           +       x     *       +       x     *       +       x     *       +       x     *              
//  x     *       +       x     *       +       x     *       +       x     *       +       x     *       +       
//=============================================================================================================

/**
 * Berechnungslogik des Masseinheiten-Rechners.
 * POST liefert:
 *      boolean inchToMetric -> Wenn dieser 'true' ist, ist der Input in 'Zoll' und soll nach 'cm' umgerechnet werden.
 *      number input -> Die Zahl die umgewandelt werden soll.
 * 
 * Es wird erwaret (als return):
 *      number result   -> Das Ergebnis, welches über ejs übermittelt wird
 *      Object inputSet -> Alle EIngaben aus dem Formular werden wieder ungefiltert zurück fesendet
 * 
 * Hinweis: Da das Eingabefeld steht auf 'required' und min='0' (Dennoch nutzen wir Anker)
 */
app.post('/masseinheiten-rechner.html', function (req, res, done) { // Masseinheiten-Rechner

    if (!req.body.input) { //Anker
        done(); //Es liegt kein Input vor
    }
    if (req.body.input <= 0) { //Anker
        done(); //Der Input  ist zu klein (negativ oder Null)
    }

    statistics.measure = statistics.measure + 1;
    //req.body.inchToMetric = (req.body.inchToMetric === req.body.inchToMetric); //Dieser tolle Befehl wandelt den String in einen Boolean um
    var result = 0;
    if (req.body.inchToMetric == 'true') {
        result = req.body.input * 2.54;
    } else {
        result = req.body.input / 2.54;
    }

    //Runden von "result : number"
    result = result.toFixed(2);

    if (req.session.loggedin == true && req.body.input > 0) { // Optional: Wenn ein Nutzer angemeldet ist, wird das Ergebnis in seiner Chronik gespeichert
        //Erzeugen des neuen Onjektes
        //JSON-Objekt für "chronicMeasure[]" (hier "obj")
        //
        //obj.user          : String    -> Username des aktuellen Nutzers
        //obj.inchToMetric  : boolean   -> Rechenmodus
        //obj.input         : number    -> Eingabe im Zahlenfeld
        //obj.result        : number    -> Ergebnis der Berechnung

        //var obj = JSON.parse("{user: 'klaus', inchToMetric: true, input: 12, result: 1}");
        chronicMeasure.push({
            "user": req.session.username,
            "inchToMetric": (req.body.inchToMetric === 'true'),
            "input": Number.parseFloat(req.body.input),
            "result": Number.parseFloat(result)
        });

        done();


    }

    res.render('masseinheiten-rechner', { activeSession: req.session, chronic: chronicMeasure, style: req.cookies.style, result: result, inputSet: req.body });
});

/**
 * Berechnungslogik des Waehrungs-Rechners.
 * POST liefert:
 *      number mode -> Der Modus 1-12, der angibt welche Währung in Was umgerechnet werden soll
 *      number input -> Die Zahl die umgewandelt werden soll.
 * 
 * Es wird erwaret (als return):
 *      number result   -> Das Ergebnis, welches über ejs übermittelt wird
 *      Object inputSet -> Alle EIngaben aus dem Formular werden wieder ungefiltert zurück fesendet
 * 
 * Hinweis: Da das Eingabefeld steht auf 'required' und min='0' (Dennoch nutzen wir Anker)
 */
app.post('/waehrungen-rechner.html', function (req, res, done) {

    if (!req.body.input) {
        done();
    }
    if (req.body.input <= 0) {
        done();
    }
    statistics.money = statistics.money + 1;

    req.body.mode = parseFloat(req.body.mode); //Umwendeln des String zurück in einen Float

    var result = 0.0;

    switch (req.body.mode) {
        case 1: //EUR > USD
            result = req.body.input * EURtoUSD;
            break;
        case 2: //EUR > GBP
            result = req.body.input * EURtoGBP;
            break;
        case 3: //EUR > YEN
            result = req.body.input * EURtoYEN;
            break;
        case 4: //USD > EUR
            result = req.body.input * EURtoUSD;
            break;
        case 5: //USD > GBP
            result = req.body.input * USDtoGBP;
            break;
        case 6: //USD > YEN
            result = req.body.input * USDtoYEN;
            break;
        case 7: //GBP > EUR
            result = req.body.input / EURtoGBP;
            break;
        case 8: //GBP > USD
            result = req.body.input / USDtoGBP;
            break;
        case 9: //GBP > YEN
            result = req.body.input * GBPtoYEN;
            break;
        case 10: //YEN > EUR
            result = req.body.input / EURtoYEN;
            break;
        case 11: //YEN > USD
            result = req.body.input / USDtoYEN;
            break;
        case 12: //YEN > GBP
            result = req.body.input / GBPtoYEN;
            break;
        default:
            done();
            break;
    }

    //Runden von "result : number"
    if (req.body.mode == 3 || req.body.mode == 6 || req.body.mode == 9) {
        result = result.toFixed(0);
    } else {
        result = result.toFixed(2);
    }
    if (req.session.loggedin == true && req.body.input > 0) { // Optional: Wenn ein Nutzer angemeldet ist, wird das Ergebnis in seiner Chronik gespeichert
        //Erzeugen des neuen Onjektes
        //JSON-Objekt für "chronicMeasure[]" (hier "obj")
        //
        //obj.user          : String    -> Username des aktuellen Nutzers
        //obj.mode          : number    -> Rechenmodus
        //obj.input         : number    -> Eingabe im Zahlenfeld
        //obj.result        : number    -> Ergebnis der Berechnung
        chronicMoney.push({
            "user": req.session.username,
            "mode": req.body.mode,
            "input": Number.parseFloat(req.body.input), //Hier wechselt JS zufällig von Number zu String ???
            "result": Number.parseFloat(result),         //Hier wechselt JS zufällig von Number zu String ???
            "date": getTime()
        });




    }

    res.render('waehrungen-rechner', { activeSession: req.session, chronic: chronicMoney, style: req.cookies.style, result: result, inputSet: req.body });
});

app.post('/strom-rechner.html', function (req, res, done) {

    if (!req.body.input1 || !req.body.input2) {
        done();
    }

    if (req.body.input1 <= 0 || req.body.input2 <= 0) {
        done();
    }

    var result;

    statistics.energy = statistics.energy + 1;

    //----
    switch (req.body.mode) {
        case "volt":
            result = req.body.input1 / req.body.input2;
            break;
        case "ampere":
            result = req.body.input2 / req.body.input1;
            break;
        case "watt":
            result = req.body.input1 * req.body.input2;
            break;
        default:
            done();
            break;
    }

    if (result) {
        result = result.toFixed(2);
    }

    if (req.session.loggedin == true && req.body.input1 > 0 && req.body.input2 > 0) { // Optional: Wenn ein Nutzer angemeldet ist, wird das Ergebnis in seiner Chronik gespeichert
        //Erzeugen des neuen Onjektes
        //JSON-Objekt für "chronicMeasure[]" (hier "obj")
        //
        //obj.user          : String    -> Username des aktuellen Nutzers
        //obj.mode          : number    -> Rechenmodus
        //obj.input1        : number    -> Eingabe im Zahlenfeld 1
        //obj.input2        : number    -> Eingabe im Zahlenfeld 2
        //obj.result        : number    -> Ergebnis der Berechnung
        chronicEnergy.push({
            "user": req.session.username,
            "mode": req.body.mode,
            "input1": Number.parseFloat(req.body.input1), //Hier wechselt JS zufällig von Number zu String ???
            "input2": Number.parseFloat(req.body.input2), //Hier wechselt JS zufällig von Number zu String ???
            "result": Number.parseFloat(result)         //Hier wechselt JS zufällig von Number zu String ???
        });
    }

    res.render('strom-rechner', { activeSession: req.session, chronic: chronicEnergy, style: req.cookies.style, result: result, inputSet: req.body });
});

//=======================================================================================
// *    -   +   *   x   *   +   *    -   +   *   x   *   +   *    -   +   *   x   *   +   
// Hilfsfunktionen     -   +   *   x   *   +   *    -   +   *   x   *   +   *    -   +   *
// *    -   +   *   x   *   +   *    -   +   *   x   *   +   *    -   +   *   x   *   +   
//=======================================================================================
function getTime() {
    var date = new Date();
    return ("(" + date.getDate() + "." + (Number.parseInt(date.getMonth()) + 1) + "." + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + " Uhr)");
}

//Starten aller wichtigen Dienste

//Statischen Ordner erstellen (root für die Webseite, nicht den Server)
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Der Port wird aus der Umgebungsvariable gelesen (wärend der Entwicklung ist er 5000 (Development))
const PORT = process.env.PORT || 5000;
// Der Port wird festgelegt
app.listen(PORT, () => console.log(`Server startet on Port ${PORT}`));