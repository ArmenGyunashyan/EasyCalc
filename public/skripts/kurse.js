var Kurse;

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

td1.innerHTML=td1Kurs;
td2.innerHTML=td2Kurs;
td3.innerHTML=td3Kurs;
td4.innerHTML=td4Kurs;
td5.innerHTML=td5Kurs;
td6.innerHTML=td6Kurs;

td7.innerHTML= td7Kurs;
td8.innerHTML= td8Kurs;
td9.innerHTML= td9Kurs;
td10.innerHTML= td10Kurs;
td11.innerHTML= td11Kurs;
td12.innerHTML= td12Kurs;

//--------------------------------------------
// Vorherige Kurse
//--------------------------------------------

var OldKurse;

var td13Old = OldKurse.OldEURtoUSD;
var td14Old = OldKurse.OldEURtoGBP;
var td15Old = OldKurse.OldEURtoYEN;
var td16Old = OldKurse.OldUSDtoGBP;
var td17Old =  OldKurse.OldUSDtoYEN;
var td18Old = OldKurse.OldGBPtoYEN;

var td13OldKurs = (td1Kurs - td13Old).toFixed(4);
var td14OldKurs = (td2Kurs - td14Old).toFixed(4);
var td15OldKurs = (td3Kurs - td15Old).toFixed(4);
var td16OldKurs = (td4Kurs - td16Old).toFixed(4);
var td17OldKurs = (td5Kurs - td17Old).toFixed(4);
var td18OldKurs = (td6Kurs - td18Old).toFixed(4);

//Hier wird der Alte Kurs ausgerechent, der zur Ausrechnung der Differenz vonnöten ist
var td19Old =  1 / td13OldKurs;
var td20Old =  1 / td14OldKurs;
var td21Old =  1 / td15OldKurs;
var td22Old =  1 / td16OldKurs;
var td23Old =  1 / td17OldKurs;
var td24Old =  1 / td18OldKurs;

// Ausrechnung der Differenz
var td19Old = (td7Kurs - td19Old).toFixed(4);
var td20Old = (td8Kurs - td20Old).toFixed(4);
var td21Old = (td9Kurs - td21Old).toFixed(4);
var td22Old = (td10Kurs - td22Old).toFixed(4);
var td23Old = (td11Kurs - td23Old).toFixed(4);
var td24Old = (td12Kurs - td24Old).toFixed(4);

td13.innerHTML= td13OldKurs;
td14.innerHTML= td14OldKurs;
td15.innerHTML= td15OldKurs;
td16.innerHTML= td16OldKurs;
td17.innerHTML= td17OldKurs;
td18.innerHTML= td18OldKurs;

td19.innerHTML= td19Old;
td20.innerHTML= td20Old;
td21.innerHTML= td21Old;
td22.innerHTML= td22Old;
td23.innerHTML= td23Old;
td24.innerHTML= td24Old;

td25.innerHTML = (1-(td1Kurs/td13Old)).toFixed(4);
td26.innerHTML = (1-(td2Kurs/td14Old)).toFixed(4);
td27.innerHTML = (1-(td3Kurs/td15Old)).toFixed(4);
td28.innerHTML = (1-(td7Kurs/td16Old)).toFixed(4);
td29.innerHTML = (1-(td4Kurs/td17Old)).toFixed(4);
td30.innerHTML = (1-(td5Kurs/td18Old)).toFixed(4);
td31.innerHTML = (1-(td8Kurs/td19Old)).toFixed(4);
td32.innerHTML = (1-(td10Kurs/td20Old)).toFixed(4);
td33.innerHTML = (1-(td6Kurs/td21Old)).toFixed(4);
td34.innerHTML = (1-(td9Kurs/td22Old)).toFixed(4);
td35.innerHTML = (1-(td11Kurs/td23Old)).toFixed(4);
td36.innerHTML = (1-(td12Kurs/td24Old)).toFixed(4);