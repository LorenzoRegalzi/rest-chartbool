$(document).ready(function() {
    //http://157.230.17.132:4029/sales da questo api abbiamo i dati
    $.ajax({
        url:'http://157.230.17.132:4029/sales',
        method: 'GET',
        success: function(data){
            for (var i = 0; i < data.length; i++) {
             var valore = data[i]
             var datiUtili = {
                 vendita: valore.amount,
                 periodo: valore.date
             }
             console.log(valore.date);

            }
        },
        error: function () {
            alert('errore');
        }
    });

    var venditeMese = {
        'gennaio': 0,
        'Febbraio': 0,
        'Marzo': 0,
        'Aprile': 0,
        'Maggio': 0,
        'Giugno': 0,
        'Luglio': 0,
        'Agosto': 0,
        'Settembre': 0,
        'Ottobre': 0,
        'Novembre': 0,
        'Dicembre': 0
};













    var ctx = $('#line');                       //da qua dobbiamo ricavare tot delle vendite nel dato periodo
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile'],         //qua bisogna mettere i dati dell'api che risalgono alle date
            datasets: [{
                label: 'vendite mensili',
                data: [2000, 3000, 1500, 2500]                          //qua dall'api dobbiamo ricavare le vnedite totali nel mese
            }]
        },
    });













    var ctx = $('#torta');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green'],
            datasets: [{
                label: 'il nome dei dati',
                data: [12, 100, 3, 5],
            }]
        },
    });
});
