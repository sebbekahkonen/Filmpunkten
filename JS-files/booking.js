
/*
    GRUNDKOD MED LITE DATA FÖR ATT BYGGA FILM-SCHEMA FÖR BOKA-SIDAN
*/

let movies = [
    {
        "title": "Up",
        "date":
            [
                { "view": "2021-03-01" },
                { "view": "2021-02-24" }
            ],
        "runtime": "107 min"
    },
    {
        "title": "Harry Potter",
        "date":
            [
                { "view": "2021-03-01" },
                { "view": "2021-02-20" }
            ],
        "runtime": "134 min"
    }
];





/*FUNKTIONER FÖR ATT BYGGA SIDORNA*/


/*MAIN-SIDAN INITIALISERAS MED HTML FRÅN STARTSIDA.HTML (DÄR LIGGER ALLT CONTENT SOM SKA IN I CONTAINER FÖR STARTSIDA)*/

buildMainHtml();

async function buildMainHtml() {
  let html = `
    ${await $.get('startsida.html')}
  `;

  $('.container').html(html);
}

 /*NEDANSTÅENDE LÄSER AV CLICK PÅ ALLA <A>-TAGGAR OCH FÖRHINDRAR ATT DEN GÅR TILL HTML-ADRESSEN. DEN HÄMTAR
        ISTÄLLET HTML-ADRESSENS CONTENT OCH LÄGGER IN DET I CONTAINER, DÄR ALL CONTENT SKA LIGGA.*/



$(function(){
       
    $('.navigation a').click(function(e) {
        e.preventDefault();

        $.get($(this).attr("href"), function(data) {
            $(".container").html(data);
        });

    });

    

    $('footer a').click(function(e) {
        e.preventDefault();

        $.get($(this).attr("href"), function(data) {
            $(".container").html(data);
        });

    });

    $('.container').on("change", "#selectDate", function () {
        dateChoice = $(this).val();
        
        $('.container').append($('#dateToView'));
        $('.container').append($('#moviesToView'));
        
        let moviesToDisplay = '';
        for (movie of movies) {
            for (movieShow of movie.date) {
                if (movieShow.view === dateChoice) {
                    console.log(movie.title + '\nis displayed on chosen day')
                    moviesToDisplay += movie.title + '&nbsp;' + '&nbsp;' + '&nbsp;' + '&nbsp;' + '&nbsp;' +'&nbsp;' +'&nbsp;' + '(runtime: ' + movie.runtime + ')' + '<br>';
                }
            }
        }
        
                    /* LÄGGA I EGEN CONTAINER, SE BOOKING.HTML*/
        if (moviesToDisplay.length > 1) {
            $('#dateToView').html(dateChoice);
            $('#moviesToView').html(moviesToDisplay);
        }
        else {
            $('#dateToView').html(dateChoice);
            $('#moviesToView').html('No movies shown on chosen date');
        }
    });
});

/*
let moviePlay = movies.map(movies => movies.date.filter(movie => movie.date === '2021-02-24') );
console.log(moviePlay);
*/

/*
let moviePlay = movies.map((movie) => {
    return {...movie, date: movie.date.filter((date) => movie.date === '2021-03-24' )}
})
*/
/*
for (movie of movies) {
    
    

    for (movieShow of movie.date) {
        if (movieShow.view === '2021-03-01') {
            console.log(movie.title + '\nis displayed on chosen day');
        }
    }
}
*/
/*
let moviePlay = movies.map((movie) => {
    return {...movie, date: movie.date.filter((date) => date.view === '2021-02-24')}
})
console.log(moviePlay);
*/


/*
arrayOfElements.map((element) => {
  return {...element, subElements: element.subElements.filter((subElement) => subElement.surname === 1)}
})
*/

/*

for (let i = 0; i < movies.length; i++) {
    let movie = movies[i];
    let moviesDate = movie.date;

    for (let j = 0; j < moviesDate.length; j++)    {
        let date = moviesDate[j];
        if (date === "2021-02-24") {
            console.log(movie.title);
        }
    }
}
*/


