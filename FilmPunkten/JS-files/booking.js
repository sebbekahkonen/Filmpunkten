
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
        "runtime": "107 min",
        "salong": "lillan"
    },
    {
        "title": "Harry Potter",
        "date":
            [
                { "view": "2021-03-01" },
                { "view": "2021-02-20" }
            ],
        "runtime": "134 min",
        "salong": "storan"
    },
    {
        "title": "Inception",
        "date":
            [
                { "view": "2021-03-01" },
                { "view": "2021-02-24" },
                { "view": "2021-02-28" }
            ],
        "runtime": "107 min",
        "salong": "storan"
    },
    {
        "title": "Avengers",
        "date":
            [
                { "view": "2021-03-01" },
                { "view": "2021-02-20" },
                { "view": "2021-02-25" }
            ],
        "runtime": "134 min",
        "salong": "mellan"
    }
];





/*FUNKTIONER FÖR ATT BYGGA SIDORNA*/


/*MAIN-SIDAN INITIALISERAS MED HTML FRÅN STARTSIDA.HTML (DÄR LIGGER ALLT CONTENT SOM SKA IN I CONTAINER FÖR STARTSIDA)*/

buildMainHtml();

async function buildMainHtml() {
    let html = `
    ${await $.get('/html-files/Startsida.html')}
  `;

    $('.container').html(html);
}

/*NEDANSTÅENDE LÄSER AV CLICK PÅ ALLA <A>-TAGGAR OCH FÖRHINDRAR ATT DEN GÅR TILL HTML-ADRESSEN. DEN HÄMTAR
       ISTÄLLET HTML-ADRESSENS CONTENT OCH LÄGGER IN DET I CONTAINER, DÄR ALL CONTENT SKA LIGGA.*/



$(function () {
    /*FUNKTION LÄNKAR I HEADER*/
    $('.navigation a').click(function (e) {
        e.preventDefault();

        $.get($(this).attr("href"), function (data) {
            $(".container").html(data);
        });
    });

    /*FUNKTION LÄNKAR I FOOTER*/
    $('footer a').click(function (e) {
        e.preventDefault();

        $.get($(this).attr("href"), function (data) {
            $(".container").html(data);
        });
    });

    $('.container').on("change", "#selectDate", function () {
        dateChoice = $(this).val();


        $('.container').append($('#dateToView'));
        $('.container').append($('#moviesToView'));

        let moviesToDisplay = '';
        let index = 1;
        for (movie of movies) {
            for (movieShow of movie.date) {
                if (movieShow.view === dateChoice) {
                    moviesToDisplay += `<button id="selectMovie" value="${movie.title}"> ${movie.title} </button><br>`;

                    /*moviesToDisplay += movie.title + '&nbsp;' + '&nbsp;' + '&nbsp;' + '&nbsp;' + '&nbsp;' + '&nbsp;' + '&nbsp;' + '(runtime: ' + movie.runtime + ')' + '<br>';*/
                }
            }
        }

        if (moviesToDisplay.length > 2) {
            $('#dateToView').html('<br>Välj film för att fortsätta:');
            $('#moviesToView').html(moviesToDisplay);
            $('#moviesToView').append('<div></div>');
        }
        else {
            $('#dateToView').empty();
            $('#moviesToView').html('Inga filmer visas på valt datum');
        }
    });

    let clickTitle;

    $('.container').on('click', 'button', function () {
        clickTitle = $(this).attr('value');

        if (clickTitle !== undefined) {
            $('#moviesToView div').html('<a href="tickets.html" id="nextStageBooking">Nästa</a>');
        }
    });

    /*FUNKTION LÄNK 'NÄSTA' PÅ BOOKING-SIDAN*/
    $('.container').on('click', '#nextStageBooking', function (e) {
        e.preventDefault();

        $.get($(this).attr("href"), function (data) {
            $(".container").html(data);
            $('.chosenMovie span').text(clickTitle);
        });

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

