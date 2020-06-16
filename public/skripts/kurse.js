var Kurse;

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

