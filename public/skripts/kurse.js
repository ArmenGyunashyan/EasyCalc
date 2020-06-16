var Kurse;
/*
var td1Kurs = (Number.parseFloat(Kurse.EURtoUSD)).toFixed(4);
var td2Kurs = (Number.parseFloat(Kurse.EURtoGBP)).toFixed(4);
var td3Kurs = (Number.parseFloat(Kurse.EURtoYEN)).toFixed(4);
var td4Kurs = (Number.parseFloat(Kurse.USDtoGBP)).toFixed(4);
var td5Kurs = (Number.parseFloat(Kurse.USDtoYEN)).toFixed(4);
var td6Kurs = (Number.parseFloat(Kurse.GBPtoYEN)).toFixed(4);


var td7Kurs = (1 / td1Kurs).toFixed(4);
var td8Kurs = (1 / td2Kurs).toFixed(4);
var td9Kurs = (1 / td3Kurs).toFixed(4);
var td10Kurs = (1 / td4Kurs).toFixed(4);
var td11Kurs = (1 / td5Kurs).toFixed(4);
var td12Kurs = (1 / td6Kurs).toFixed(4);

td1.innerHTML=td1Kurs; //1
td2.innerHTML=td2Kurs; //2
td3.innerHTML=td3Kurs; //3
td4.innerHTML=td7Kurs; //4
td5.innerHTML=td4Kurs; //5
td6.innerHTML=td5Kurs; //6

td7.innerHTML= td8Kurs; //7
td8.innerHTML= td10Kurs; //8
td9.innerHTML= td6Kurs; //9
td10.innerHTML= td9Kurs; //10
td11.innerHTML= td11Kurs; //11
td12.innerHTML= td12Kurs; //12

//--------------------------------------------
// Vorherige Kurse
//--------------------------------------------

var OldKurse;

var td13Old = OldKurse.OldEURtoUSD;
var td14Old = OldKurse.OldEURtoGBP;
var td15Old = OldKurse.OldEURtoYEN;
var td16Old = 1/td13Old;
var td17Old =  OldKurse.OldUSDtoGBP;
var td18Old = OldKurse.OldUSDtoYEN;

var td13OldKurs = (td1Kurs - td13Old).toFixed(4);
var td14OldKurs = (td2Kurs - td14Old).toFixed(4);
var td15OldKurs = (td3Kurs - td15Old).toFixed(4);
var td16OldKurs = (td4Kurs - td16Old).toFixed(4);
var td17OldKurs = (td5Kurs - td17Old).toFixed(4);
var td18OldKurs = (td6Kurs - td18Old).toFixed(4);

//Hier wird der Alte Kurs ausgerechent, der zur Ausrechnung der Differenz vonnöten ist
var td19OldKurs =  1 / td14Old;
var td20OldKurs =  1 / td14OldKurs;
var td21OldKurs =  OldKurse.OldGBPtoYEN;
var td22OldKurs =  1 / td16OldKurs;
var td23OldKurs =  1 / td17OldKurs;
var td24OldKurs =  1 / td18OldKurs;

// Ausrechnung der Differenz
var td19Old = (td8Kurs - td19OldKurs).toFixed(4);
var td20Old = (td10Kurs - td20OldKurs).toFixed(4);
var td21Old = (td6Kurs - td21OldKurs).toFixed(4);
var td22Old = (td9Kurs - td22OldKurs).toFixed(4);
var td23Old = (td11Kurs - td23OldKurs).toFixed(4);
var td24Old = (td12Kurs - td24OldKurs).toFixed(4);

td13.innerHTML= td13OldKurs; //1
td14.innerHTML= td14OldKurs; //2
td15.innerHTML= td15OldKurs; //3
td16.innerHTML= td16OldKurs; //4
td17.innerHTML= td17OldKurs; //5
td18.innerHTML= td18OldKurs; //6

td19.innerHTML= td19Old; //7
td20.innerHTML= td20Old; //8
td21.innerHTML= td21Old; //9
td22.innerHTML= td22Old; //10
td23.innerHTML= td23Old; //11
td24.innerHTML= td24Old; //12

td25.innerHTML = (1-(td1Kurs/td13Old)).toFixed(4) + ' %'; //1
td26.innerHTML = (1-(td2Kurs/td14Old)).toFixed(4) + ' %'; //2
td27.innerHTML = (1-(td3Kurs/td15Old)).toFixed(4) + ' %'; //3
td28.innerHTML = (1-(td8Kurs/td16Old)).toFixed(4) + ' %'; //4
td29.innerHTML = (1-(td4Kurs/td17Old)).toFixed(4) + ' %'; //5
td30.innerHTML = (1-(td5Kurs/td18Old)).toFixed(4) + ' %'; //6
td31.innerHTML = (1-(td8Kurs/td19Old)).toFixed(4) + ' %'; //7
td32.innerHTML = (1-(td10Kurs/td20Old)).toFixed(4) + ' %'; //8
td33.innerHTML = (1-(td6Kurs/td21Old)).toFixed(4) + ' %'; //9
td34.innerHTML = (1-(td9Kurs/td22Old)).toFixed(4) + ' %'; //10
td35.innerHTML = (1-(td11Kurs/td23Old)).toFixed(4) + ' %'; //11
td36.innerHTML = (1-(td12Kurs/td24Old)).toFixed(4) + ' %'; //12

var tdArray = [
    td1, 
    td2, 
    td3, 
    td4, 
    td5, 
    td6, 
    td7, 
    td8, 
    td9, 
    td10, 
    td11, 
    td12, 
    td13, 
    td14, 
    td15, 
    td16, 
    td17, 
    td18, 
    td19, 
    td20, 
    td21, 
    td22, 
    td23, 
    td24, 
    td25, 
    td26, 
    td27, 
    td28, 
    td29, 
    td30, 
    td31, 
    td32, 
    td33, 
    td34, 
    td35, 
    td36    
];

for(var i = 0; i < tdArray.length; i++) {

    if(Number.parseFloat(tdArray[i].innerHTML) < 0) {
        tdArray[i].style.color="#cc0000";
    }
}

*/

const table = document.getElementById('table');
for (var z = 2, row; row = table.rows[z]; z++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    for (var s = 1, col; col = row.cells[s]; s++) {
        //iterate through columns
        //columns would be accessed using the "col" variable assigned in the for loop

        if (s == 1) {
            switch (z) {
                case 2:
                    renderElement(Kurse.EURtoUSD, col);
                    break;
                case 3:
                    renderElement(Kurse.EURtoGBP, col);
                    break;
                case 4:
                    renderElement(Kurse.EURtoYEN, col);
                    break;
                case 5:
                    renderElement(1 / Kurse.EURtoUSD, col);
                    break;
                case 6:
                    renderElement(Kurse.USDtoGBP, col);
                    break;
                case 7:
                    renderElement(Kurse.USDtoYEN, col);
                    break;
                case 8:
                    renderElement(1 / Kurse.EURtoGBP, col);
                    break;
                case 9:
                    renderElement(1 / Kurse.USDtoGBP, col);
                    break;
                case 10:
                    renderElement(Kurse.GBPtoYEN, col);
                    break;
                case 11:
                    renderElement(1 / Kurse.EURtoYEN, col);
                    break;
                case 12:
                    renderElement(1 / Kurse.USDtoYEN, col);
                    break;
                case 13:
                    renderElement(1 / Kurse.GBPtoYEN, col);
                    break;
                default:
                    break;
            }
        }

        if (s == 2) {
            switch (z) {
                case 2:
                    renderElement(Kurse.EURtoUSD - OldKurse.EURtoUSD, col);
                    break;
                case 3:
                    renderElement(Kurse.EURtoGBP - OldKurse.EURtoGBP, col);
                    break;
                case 4:
                    renderElement(Kurse.EURtoYEN - OldKurse.EURtoYEN, col);
                    break;
                case 5:
                    renderElement((1 / Kurse.EURtoUSD) - ( 1 / OldKurse.EURtoUSD), col);
                    break;
                case 6:
                    renderElement(Kurse.USDtoGBP - OldKurse.USDtoGBP, col);
                    break;
                case 7:
                    renderElement(Kurse.USDtoYEN - OldKurse.USDtoYEN, col);
                    break;
                case 8:
                    renderElement((1 / Kurse.EURtoGBP) - (1 / OldKurse.EURtoGBP), col);
                    break;
                case 9:
                    renderElement((1 / Kurse.USDtoGBP) - ( 1 / OldKurse.USDtoGBP), col);
                    break;
                case 10:
                    renderElement(Kurse.GBPtoYEN - OldKurse.GBPtoYEN, col);
                    break;
                case 11:
                    renderElement((1 / Kurse.EURtoYEN) - ( 1 / OldKurse.EURtoYEN), col);
                    break;
                case 12:
                    renderElement((1 / Kurse.USDtoYEN) - ( 1 / OldKurse.USDtoYEN), col);
                    break;
                case 13:
                    renderElement((1 / Kurse.GBPtoYEN) - ( 1 / OldKurse.GBPtoYEN), col);
                    break;
                default:
                    break;
            }
        }

        if (s == 3) {
            switch (z) {
                case 2:
                    renderElementProzent((1-OldKurse.EURtoUSD / Kurse.EURtoUSD) * 100, col);
                    break;
                case 3:
                    renderElementProzent((1- OldKurse.EURtoGBP / Kurse.EURtoGBP) * 100, col);
                    break;
                case 4:
                    renderElementProzent(( 1 - OldKurse.EURtoYEN / Kurse.EURtoYEN) * 100, col);
                    break;
                case 5:
                    renderElementProzent(( 1 - ( 1 / OldKurse.EURtoUSD) / (1 / Kurse.EURtoUSD)) * 100, col);
                    break;
                case 6:
                    renderElementProzent(( 1 - OldKurse.USDtoGBP / Kurse.USDtoGBP) * 100, col);
                    break;
                case 7:
                    renderElementProzent(( 1 - OldKurse.USDtoYEN / Kurse.USDtoYEN) * 100, col);
                    break;
                case 8:
                    renderElementProzent(( 1 - (1 / OldKurse.EURtoGBP) / (1 / Kurse.EURtoGBP)) * 100, col);
                    break;
                case 9:
                    renderElementProzent(( 1 - ( 1 / OldKurse.USDtoGBP) / (1 / Kurse.USDtoGBP)) * 100, col);
                    break;
                case 10:
                    renderElementProzent(( 1 - OldKurse.GBPtoYEN / Kurse.GBPtoYEN) * 100, col);
                    break;
                case 11:
                    renderElementProzent(( 1 - ( 1 / OldKurse.EURtoYEN) / (1 / Kurse.EURtoYEN)) * 100, col);
                    break;
                case 12:
                    renderElementProzent(( 1 - ( 1 / OldKurse.USDtoYEN) / (1 / Kurse.USDtoYEN)) * 100, col);
                    break;
                case 13:
                    renderElementProzent(( 1 - ( 1 / OldKurse.GBPtoYEN) / (1 / Kurse.GBPtoYEN)) * 100, col);
                    break;
                default:
                    break;
            }
        }


    }

    
}

function renderElement(zahl, domElement) {
    zahl = zahl.toFixed(4);
    if (zahl < 0) {
        domElement.style.color = "#cc0000"
    }
    col.innerHTML = zahl;
}

function renderElementProzent(zahl, domElement) {
    zahl = zahl.toFixed(4);
    if (zahl < 0) {
        domElement.style.color = "#cc0000"
    }
    col.innerHTML = zahl + " %";
}

