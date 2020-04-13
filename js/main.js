$(document).ready(function() {

chiamateajax();

    $('#invia').click(function() {
        var nome = $('#select').val();
        var data = $('#data').val();
        var datacorr= moment(data, 'DD-MM-YYYY').format('DD/MM/YYYY');
        var amount = parseInt($('#input-vend').val());
        $.ajax({
            url:'http://157.230.17.132:4029/sales',
            method:'POST',
            data: {
                salesman: nome,
                amount: amount,
                date: datacorr,
            },
            success: function(data){
                chiamateajax()
            }
        });
    });


    function chiamateajax(){
    $.ajax({
        url:'http://157.230.17.132:4029/sales',
        method: 'GET',
        success: function(dati){
            var graficoLinea= estraggoDatiline(dati);
            var arraymesi =   crealine(graficoLinea.mesi, graficoLinea.vendite);
            var graficoTorta= estraggoDatiTorta(dati);
            var arraytotale= creatorta(graficoTorta.vendito, graficoTorta.tot)
        },
        error: function () {
            alert('errore');
        }
    });
}

    function estraggoDatiline(dati) {
        var venditeOrdinate = {                                                          //creo un'oggeto per ordinare i mesi nel grafico
            'gennaio': 0,
            'febbraio': 0,
            'marzo': 0,
            'aprile': 0,
            'maggio': 0,
            'giugno': 0,
            'luglio': 0,
            'agosto': 0,
            'settembre': 0,
            'ottobre': 0,
            'novembre': 0,
            'dicembre': 0
        };
        for (var i = 0; i < dati.length; i++) {                                 // ciclo i dati presi dall'api
            var datiSingoli = dati[i]                                           // li suddividio singolarmente
            var periodoVendita= datiSingoli.date;
            var soldi = parseInt(datiSingoli.amount)                        //do ad una variabile le singole date delle vendite
            var mese= moment(periodoVendita, 'DD-MM-YYYY').format('MMMM');         //trasformo la var appena creata paragonandola al formato standard e ne prendo solo il mese
                if (venditeOrdinate[mese]== undefined) {                             // faccio in modo tale che se un dato è indefinito valga 0
                    venditeOrdinate[mese]=0;
                }
            venditeOrdinate[mese]+= soldi;
            console.log(soldi);                         // sommo il denaro che si associa per mese
        }
        var venditeInMese= [];                                                      // array vuota in cui inserisco le date, li utilizzo per darli in pasto al grafico
        var meseXmese = [];                                                         // array vioto in cui inserisco la vendita nel mese, li utilizzo per darli in pasto al grafico
        for (var key in venditeOrdinate) {
            venditeInMese.push(key);                                            //inserisco i dati in una var piu semplice da digerire al grafico
            meseXmese.push(venditeOrdinate[key]);                                    //stesso discorso
        }
        return{
            mesi:venditeInMese,
            vendite:meseXmese
        }
    }

    function crealine(labels , data ) {
        var ctx = $('#line');                       //da qua dobbiamo ricavare tot delle vendite nel dato periodo
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,         //qua bisogna mettere le date
                datasets: [{
                    label: 'vendite mensili',
                    data: data,                        //qua dall'api le vendite nel mese
                    backgroundColor: 'blue',
                    borderColor: 'white'
                }]
            },
        });
    }

    function estraggoDatiTorta(dati){
        var graficoTorta= {};
        for (var i = 0; i < dati.length; i++) {                                 //prendo i dati dell'api
            var datiVenditore = dati[i];                                        //do una variabile ai dati singolarmaente
            var venditore = datiVenditore.salesman;                             //do una var all'oggetto contenente i nomi dei venditori
            var totaleVendite = parseInt(datiVenditore.amount);                           //do una var all'oggetto contenente le vendite dei venditori
            if (graficoTorta[venditore] === undefined) {                        //if in cui gia che ci sono unisco al mio oggetto vuoto l'oggetto contenente i venditori
                graficoTorta[venditore] = 0;                                    //mi assicuro che se l'oggeto è indefinito vale 0
            }
            graficoTorta[venditore] += totaleVendite;                           //sommo il totale delle vendite ai venditori con lo stesso nome
        }
        var venditoreXnome= [];                                                     //l'array in cui inserisco i nomi dei venditori
        var totaleXvenditore= [];
        for (var key in graficoTorta) {                                         // for in per rendere digeribile i miei dati al grafico
            venditoreXnome.push(key)
            totaleXvenditore.push(graficoTorta[key])
        }
        return{
            vendito:venditoreXnome,
            tot:totaleXvenditore
        }
    }

    function creatorta(labels, data) {
        var ctx = $('#torta');
        var chart = new Chart(ctx, {
           type: 'doughnut',
           data: {
           labels: labels,
           datasets: [{
               label: 'Fatturato per venditore',
               backgroundColor: ['red', 'blue', 'yellow', 'green'],
               borderColor: 'white',
               data: data
            }]
            },
        });
    }

});
