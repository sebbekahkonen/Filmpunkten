/*
bokning_bokningar
id, user_id, boking_datum_id, stol(0-99999),   typ
    1        1                1                vuxen
    1        1                51                barn
*/



/*NEDANSTÅENDE LÄSER AV CLICK PÅ ALLA <A>-TAGGAR OCH FÖRHINDRAR ATT DEN GÅR TILL HTML-ADRESSEN. DEN HÄMTAR
       ISTÄLLET HTML-ADRESSENS CONTENT OCH LÄGGER IN DET I CONTAINER, DÄR ALL CONTENT SKA LIGGA.*/



$(function () {
    
    $('main').on("change", "#selectDate", function () {
        dateChoice = $(this).val();
        
        $('main').append($('#dateToView'));
        $('main').append($('#moviesToView'));

        showMovies(dateChoice);
    });

    
    let clickTitle;
    let selectedBookingId;
    let tickets = [];
    seatTable = '';

    $('main').on('click', 'button', function () {
        selectedBookingId = $(this).attr('value');
        clickTitle = $(this).text();
        console.log(clickTitle);

        if (clickTitle !== undefined) {
            $('#moviesToView div').html('<a href="/html-files/tickets.html" id="nextStageBooking">Nästa</a>');
        }
    });

    /*FUNKTION LÄNK 'NÄSTA' PÅ BOOKING-SIDAN*/
    $('main').on('click', '#nextStageBooking', function (e) {
        e.preventDefault();

        $.get($(this).attr("href"), function (data) {
            $("main").html(data);
            $('.chosenMovie span').text(clickTitle);
        });

    });

    $('main').on('change', '#chooseTickets input', function (e) {

        let showNext = false;

        $('#chooseTickets input').each(function () {

            if ($(this).val() > 0) {
                showNext = true;
            }
            
            tickets[$(this).attr('id')] = $(this).val();
        });

        if (showNext) {
            $('#nextButtonTickets').show();
        } else {
            $('#nextButtonTickets').hide();
        }

    });

    $('main').on('click', '#nextButtonTickets', function (e) {
        e.preventDefault();

        $.get($(this).attr("href"), function (data) {
            $("main").html(data);
        });

        console.log(tickets);

        seatTable = $('#bookingSeats');
        updateSeats();

    });
    
});

let smallSaloon = 60;
let mediumSaloon = 80;
let bigSaloon = 100;



function updateSeats()
{
    let seatCount = 0;
    let numOfSeats = 100;
    

    // TODO: skpaka en function för o hämta bokade platser, retunera svar hit för kontroll vid utmatning

}
    
    
async function showMovies(dateChoice) {

    let moviesToDisplay = '';
    let result = await db.run(/*sql*/`
        SELECT FilmTable.*,
        show_times.id AS show_times_id
        FROM FilmTable
        JOIN show_times
        ON show_times.film_table_id = FilmTable.id
        WHERE show_times.date='${dateChoice}'
        ORDER BY FilmTable.title
    `);

    for (let row of result) {
        moviesToDisplay += `<button id="selectMovie" value="${row.show_times_id}"> ${row.title} </button><br>`;
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
}


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

/*
    // FUNKTION LÄNKAR I HEADER
    $('.navigation a').click(function (e) {
        e.preventDefault();

        $.get($(this).attr("href"), function (data) {
            $(".container").html(data);
        });
    });

    // FUNKTION LÄNKAR I FOOTER
    $('footer a').click(function (e) {
        e.preventDefault();

        $.get($(this).attr("href"), function (data) {
            $(".container").html(data);
        });
    });


// FUNKTIONER FÖR ATT BYGGA SIDORNA


// MAIN-SIDAN INITIALISERAS MED HTML FRÅN STARTSIDA.HTML (DÄR LIGGER ALLT CONTENT SOM SKA IN I CONTAINER FÖR STARTSIDA)

buildMainHtml();

async function buildMainHtml() {
    let html = `
    ${await $.get('/html-files/Startsida.html')}
  `;

    $('.container').html(html);
}

*/

