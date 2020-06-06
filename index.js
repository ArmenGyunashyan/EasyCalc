//Imports (da es JS isst, siind es Variablen)
const express = require('express'); // Express-Framework
const path = require('path');


// Die Hauptanwendung wird gestartet
const app = express();
/*
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
*/
//Statischen Ordner erstellen (root für die Webseite, nicht den Server)
app.use(express.static(path.join(__dirname, 'public')));

// Der Prot wird aus der Umgebungsvariable gelesen (wärend der Entwicklung ist er 5000 (Development))
const PORT = process.env.PORT || 5000;
// Der Prot wird festgelegt
app.listen(PORT, () => console.log(`Server startet on Port ${PORT}`));

//Dennis's Test Kommentar