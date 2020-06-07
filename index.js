//Imports (da es JS ist, sind es Variablen)
const express = require('express'); // Express-Framework
const path = require('path'); // Keiine Ahnung (wird aber bei fast allem benötigt)
const session = require('express-session'); // Session-Unterstützung für das Login-System. (Alle Infoematiionen über einen Nutzer sind später im Session-Objekt)
const bodyParser = require('body-parser'); // Zum Extrahieren von Html-Form-Daten (Formulardaten aus z.B. Inputfeldern)
//const passport = require('passport');
/*
const initializePassport = rewuire('./passport-config');
initializePassport(passport);
*/


//Variablen für die Session-------------------
const username = 'root'; //veraltet
const password = 'admin'; //veraltet
const users = [
    {
        username: "root",
        password: "admin"
    },
    {
        username: "test",
        password: "test"
    }
];
var sess = {
    cookie: null,
    loggedin: false,
    username: null
}; //Die aktuelle Session (wenn vorhanden)
//--------------------------------------------


// Die Hauptanwendung wird gestartet
const app = express();

//Login-Funktionen----------------------------------

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extendet: true}));
app.use(bodyParser.json());

// Abfangen des POST (/login.html/auth)
app.post('/login.html/auth', function(req, res) {
    var user = req.body.username; //Auslesen der Variable 'username' aus dem Body des Http-Requests (hier als -> var res)
    var pw = req.body.password; //Auslesen der Variable 'password' aus dem Body des Http-Requests (hier als -> var res)
    if(user && pw) {
        if(user == username && pw == password) { // Überprüft Login-Daten auf Übereinstimmung
            req.session.loggedin = true;
            req.session.username = user; //Die Variable {var req}.session ist von über all aus zugreifbar (wiie ein globaler Cookie)
            sess = req.session;
            res.redirect('/');
        } else {
            res.send('Passwort oder Nutzername falsch!');
        }
        res.end();
    } else {
        response.send('Please enter Username and Password!');
		response.end();
    }
});

//--------------------------------------------------
function checkAuth() {
    if(sess) {
        console.log(sess.username + " is logged in");
        return true;
    }
    return false;
}

function requireLogin(req, res, done){
    if (sess.loggedin) {
      var postLoginRedirectUrl = req.originalUrl;
      // store this url somehow (session or query params?)
      console.log('angemeldet');
      res.redirect('/');
      done();
    } else {
      done();
    }
}

app.get('/login.html', requireLogin);

//Statischen Ordner erstellen (root für die Webseite, nicht den Server)
app.use(express.static(path.join(__dirname, 'public')));

// Der Port wird aus der Umgebungsvariable gelesen (wärend der Entwicklung ist er 5000 (Development))
const PORT = process.env.PORT || 5000;
// Der Port wird festgelegt
app.listen(PORT, () => console.log(`Server startet on Port ${PORT}`));