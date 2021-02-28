




$(function () {
    
    //Sätt datumväljaren till dagens datum och max ett år framåt
    let today = new Date();
    let yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (mm < 10) { mm = '0' + mm; }
    if (dd < 10) { dd = '0' + dd; }

    let todaysDate = yyyy + '-' + mm + '-' + dd;
    let maxDate = (yyyy + 1) + '-' + mm + '-' + dd;

    $('#selectDate').attr({
        'min': todaysDate,
        'max': maxDate
    });

    //Samlar upp valt datum och visar filmer därefter
    $('main').on("change", "#selectDate", function () {
        dateChoice = $(this).val();
        
        $('main').append($('#dateToView'));
        $('main').append($('#moviesToView'));

        showMovies(dateChoice);
    });

    //Variabler för vald film, visningens id, biljetter, boka platser
    let clickTitle;
    selectedBookingId = 0;
    tickets = [];
    bookingSeats = '';

    //Samlar upp vald film (titel), den valda filmens visnings-id
    $('main').on('click', 'button', function () {
        selectedBookingId = $(this).attr('value');
        clickTitle = $(this).text();

        //Om clickTitle har fått ett värde lägger vi till knapp "nästa"
        if (clickTitle !== undefined) {
            $('#moviesToView div').html('<a href="/html-files/tickets.html" id="nextStageBooking">Nästa</a>');
        }
    });

    //Funktion för "nästa"-knappen på bokningssidan
    $('main').on('click', '#nextStageBooking', function (e) {
        e.preventDefault();

        //läser in innehållet från tickets.html och tar även med vald titel
        $.get($(this).attr("href"), function (data) {
            $("main").html(data);
            $('.chosenMovie span').text(clickTitle);
        });
    });


    $('main').on('change', '#chooseTickets input', function (e) {
        //"Boolean-värde för "nästa"-knapp i detta steg.
        let showNext = false;
        let count = 0;

        $('#chooseTickets input').each(function () {
            //om någon biljett-typ har värde större än 0 visas knapp "nästa"
            if ($(this).val() > 0) {
                showNext = true;
            }
            //fyller tickets med vald biljett-typ och antal med biljett-typ som nyckel till antal
            tickets[$(this).attr('id')] = parseInt($(this).val());
            count += parseInt($(this).val());
        });

        tickets["total"] = count;

        //visa "nästa"-knapp om boolean = true
        if (showNext) {
            $('#nextButtonTickets').show();
        } else {
            $('#nextButtonTickets').hide();
        }
    });

    //Om klicka på nästa, ladda nästa, stolsbokning
    $('main').on('click', '#nextButtonTickets', function (e) {
        e.preventDefault();

        $.get($(this).attr("href"), function (data) {
            $("main").html(data);
            bookingSeats = $('#bookingSeats');
            //Kalla funktion för att skapa rendering av platser
            createSeats();
        });
    });
    
});

chosenSeats = [];

function createSeats()  {
    let seatCount = 0;
    let numOfSeats = 100;
    let html = "";

    //Bygga tabellens rader med rätt antal platser/rad
    html += "<tr>";
    for (let i = 0; i < numOfSeats; i++) {
        //10 platser/rad
        if (i % 10 == 0) {
            html += "</tr><tr>";
        }
        //Renderas med stolsnummer (och färg ledig/upptagen)
        html += '<td data-seat="'+(i+1)+'">'+(i+1)+'</td>';

    }
    html += "</tr>";

    bookingSeats.append(html);
    $('#bookingSeatsText span').text(tickets['total']);

    bookingSeats.find("td").click(function () {
        //Valda platser sparas i chosenSeats
        //Om man klickar igen på plats man valt så av-väjer man den
        let chosenNumber = $(this).text();
        if (chosenSeats.includes(chosenNumber)) {

            let indexOfNumber = chosenSeats.indexOf(chosenNumber);
            chosenSeats.splice(indexOfNumber, 1);
            console.log(chosenSeats);
            $(this).removeClass('selectedSeat');

        } else if (chosenSeats.length < tickets['total']) {

            chosenSeats.push($(this).text());
            console.log(chosenSeats);
            $(this).addClass('selectedSeat');
        } else {
            // Max seats selected
        }
        
        if (chosenSeats.length == tickets['total']) {
            $('#nextButtonConfBooking').show();
        } else {
            $('#nextButtonConfBooking').hide();
        }

        $('#bookingSeatsText span').text(tickets['total']-chosenSeats.length);
    });

    $('#nextButtonConfBooking').click(function (e) {
        e.preventDefault();

        let bookingNumber = Math.random().toString(36).substr(2, 8);
        let username = "user_"+bookingNumber;
        
        insertBooking(selectedBookingId, bookingNumber, username);

        // let resultc = db.run("SELECT * FROM booking");
        // console.table(resultc);

        // console.log(bookingId);


        // Save booking
        

        //aaa = db.run("SELECT last_insert_rowid() as id");

        // console.log(getInsertId());
        // console.log(getInsertId());


        // Show confirm

        
        // alert("Booking saved!");
    });

    updateSeats();
}

// TODO: skapa metod för insert

async function insertBooking(showTimesId, bookingNumber, username) {

    console.log("InsertBooking");
    /*
    let result = db.run("SELECT last_insert_rowid() as id");
    console.table(result);
    let resulta = db.run("SELECT last_insert_rowid() as id");
    console.table(resulta);
    let resultb = db.run("SELECT last_insert_rowid() as id");
    console.table(resultb);
    let resultc = db.run("SELECT last_insert_rowid() as id");
    console.table(resultc);
    */
    
    let result = await db.run(`
        INSERT INTO booking (
            number,
            show_times_id,
            RegisterTable_username
        ) VALUES (
            $A_bookingNumber,
            $A_showTimesId,
            $A_username
        );
    `, {
        A_bookingNumber : bookingNumber,
        A_showTimesId : showTimesId,
        A_username : username,
    }, function (err) {
        console.log(err);
        console.log(this.lastID);
    });


    // return "ok";
    // return getInsertId();
}

async function getBookingId() {

    // TODO: get the booking id by username and showTimesId
    let result = await db.run("SELECT last_insert_rowid() as id");
    let id = 0;

    for (let row of result) {
        id = row.id;
    }

    console.log(id);
    aaa = result;

    return id;
}

//Hämta från DB vilka platser som är upptagna och rendera dem annorlunda
async function updateSeats()    {

    let seats = [];

    let result = await db.run(/*sql*/`
        SELECT booking_seat.seat
        FROM booking
        JOIN booking_seat
        ON booking.id=booking_seat.booking_id
        WHERE show_times_id='${selectedBookingId}'
        ORDER BY seat
    `);

    for (let row of result) {

        seats.push(row.seat);

        bookingSeats.find("td[data-seat=" + row.seat + "]").addClass("reserved");

    }
}

//Visa filmer som visas på valt datum (matchar datum mot DB)
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
        //Plocka med visningens id från DB för att använda vid stolsbokning
        moviesToDisplay += `<button id="selectMovie" value="${row.show_times_id}"> ${row.title} </button><br>`;
    }

    if (moviesToDisplay.length > 2) {
        $('#dateToView').html('<br>Välj film för att fortsätta:');
        $('#moviesToView').html(moviesToDisplay);
        $('#moviesToView').append('<div></div>');
    }
    //Om inga filmer matchar datum, rendera följande.
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

