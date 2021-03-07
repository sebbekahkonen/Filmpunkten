if (document.getElementById('login_href').text === 'Min sida' === true) {
    $('main').append(/*html*/`
    <h2 class="choiceheader">Välj datum för att boka biljetter</h2>
    <input type="date" id="selectDate" min="2021-01-01" max="2022-12-31">
    <div id="dateToView"></div>
    <p id="moviesToView"></p>
    `)
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
            sessionStorage.setItem('chosenDate', dateChoice);
            $('main').append($('#dateToView'));
            $('main').append($('#moviesToView'));

            showMovies(dateChoice);
        });
        //Variabler för vald film, visningens id, biljetter, boka platser
        let clickTitle;
        selectedBookingId = 0;
        selectedTime = "";
        tickets = [];
        bookingSeats = '';
        //Samlar upp vald film (titel), den valda filmens visnings-id
        $('main').on('click', 'button', function () {
            selectedBookingId = $(this).attr('value');
            clickTitle = $(this).text();
            sessionStorage.setItem('title', clickTitle);
            selectedTime = $(this).siblings('.saloonTime').text();

            //Om clickTitle har fått ett värde lägger vi till knapp "nästa"
            if (clickTitle !== undefined) {
                $('#moviesToView div').html('<a href="/html-files/tickets.html" class="nextButton" id="nextStageBooking">Nästa</a>');
            }
            $('main').find('button').removeClass('active');
            $(this).addClass('active');
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
            tickets["price"] = 0;
            tickets["total"] = 0;

            $('#chooseTickets input').each(function () {
                //om någon biljett-typ har värde större än 0 visas knapp "nästa"
                if ($(this).val() > 0) {
                    showNext = true;
                }
                //fyller tickets med vald biljett-typ och antal med biljett-typ som nyckel till antal
                let key = $(this).attr('id');
                tickets[key] = parseInt($(this).val());
                tickets["total"] += parseInt($(this).val());

                if (key == "adult") {
                    tickets["price"] += parseInt(tickets[key]*85);
                } else if (key == "child" || key == "student") {
                    tickets["price"] += parseInt(tickets[key]*65);
                } else if (key == "retired") {
                    tickets["price"] += parseInt(tickets[key]*75);
                }
            });
            $('#ticketsTotalPrice').text("Summa: "+tickets["price"]+"kr");
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
} else {
    $('main').append(/*html*/`
    <h3>Du måste logga in för att kunna boka</h3>
    <button onClick= "window.location.hash= '#login'" class= "bokaLogin">Logga in</button>
    <p>eller</p>
    <button onClick= "window.location.hash= '#register'" class= "bokaRegister">Registrera dig</button>
    `);
}

chosenSeats = [];

function createSeats() {
    let numOfSeats = 100;
    let html = "";
    //Bygga tabellens rader med rätt antal platser/rad
    html += "<tr>";
    for (let i = 0; i < numOfSeats; i++) {
        //10 platser/rad
        if (i % 10 == 0) {
            html += "</tr><tr>";
        }   //Renderas med stolsnummer (och färg ledig/upptagen)
        html += '<td data-seat="' + (i + 1) + '">' + (i + 1) + '</td>';
    }
    html += "</tr>";

    bookingSeats.append(html);
    $('#bookingSeatsText span').text(tickets['total']);

    bookingSeats.find("td").click(function () {
        //Valda platser sparas i chosenSeats, Om man klickar igen på plats man valt så av-väjer man den
        let chosenNumber = $(this).text();
        if (chosenSeats.includes(chosenNumber)) {

            let indexOfNumber = chosenSeats.indexOf(chosenNumber);
            chosenSeats.splice(indexOfNumber, 1);
            console.log(chosenSeats);
            $(this).removeClass('selectedSeat');

        } else if (chosenSeats.length < tickets['total']) {
            chosenSeats.push($(this).text());
            $(this).addClass('selectedSeat');
        } else {}

        if (chosenSeats.length == tickets['total']) {
            $('#nextButtonConfBooking').show();
        } else {
            $('#nextButtonConfBooking').hide();
        }
        $('#bookingSeatsText span').text(tickets['total'] - chosenSeats.length);
    });

    $('#nextButtonConfBooking').click(async function (e) {
        e.preventDefault();
        //Föbereder innehåll till confirmation booking och lägger till det
        let bookingNumber = Math.random().toString(36).substr(2, 8);
        let chosenMovie = sessionStorage.getItem('title');
        let chosenDate = sessionStorage.getItem('chosenDate');
        let registerTable = await db.run(/*sql*/`
        
        SELECT *
        FROM RegisterTable
        `);
        let userId = sessionStorage.getItem("user");
        let username = registerTable[userId].username;
        insertBooking(selectedBookingId, bookingNumber, username);
        
        let chosenSeatsString1 = '<p>Du har valt plats:<span id="renderChosenSeats"> ';
        chosenSeats.sort();
        for (let number of chosenSeats) {
            chosenSeatsString1 += number + ', '
        }
        let chosenSeatsString = chosenSeatsString1.substring(0, (chosenSeatsString1.length - 2)) + '</span></p>';

        $.get($(this).attr('href'), function (data) {               //print booking confirmation
            $('main').html(data);
            $('#thanksHeader').append(username);
            $('#chosenTitle').append(chosenMovie);
            $('#renderChoices').append(`<p id="chosenDate">${chosenDate}&nbsp;&nbsp;&nbsp;${selectedTime}</p>`);
            $('#renderChoices').append(`<br><p>Bokningsnummer: <span id="renderBookingNumber">${bookingNumber}</span></p>`);
            $('#renderChoices').append(chosenSeatsString);
            $('#renderTotal').html("Summa:&nbsp;&nbsp;&nbsp;"+tickets["price"]+"kr");
        });
    });
    updateSeats();
    setInterval(function () {
        updateSeats();
    }, 3000);
}

async function getBookingId(bookingNumber) {
    let result = await db.run("SELECT id FROM booking WHERE number='" + bookingNumber + "'");
    for (let row of result) {
        sessionStorage.setItem('id', parseInt(row.id));
    }
}

async function insertSeat(bookingId, seatNumber) {
    await db.run('BEGIN TRANSACTION');          //spara bokade platser i DB, sker först när man trycker på "Slutför" på stolsbokningssidan
    await db.run(`
        INSERT INTO booking_seat (
            booking_id,
            seat
        ) VALUES (?, ?);
    `, [
        bookingId,
        seatNumber
    ]);
    await db.run('COMMIT');
}

async function insertBooking(showTimesId, bookingNumber, username) {

    await db.run('BEGIN TRANSACTION');
    await db.run(`
        INSERT INTO booking (
            number,
            show_times_id,
            RegisterTable_username
        ) VALUES (?, ?, ?);
    `, [
        bookingNumber,
        showTimesId,
        username,
    ]);
    await db.run('COMMIT');
    await getBookingId(bookingNumber);  // return fungerar ej, använder sessionStorage för att få tillbaka värdet
    let bookingId = sessionStorage.getItem('id');

    for (let number of chosenSeats) {
        await insertSeat(bookingId, number);
    }
}
//Hämta från DB vilka platser som är upptagna och rendera dem annorlunda
async function updateSeats() {
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

    let showMovies = false;
    let moviesToDisplay = '<ul id="selectMovie">';
    let result = await db.run(/*sql*/`
        SELECT FilmTable.*,
        show_times.id AS show_times_id,
        show_times.saloon AS show_times_saloon,
        show_times.time AS show_times_time
        FROM FilmTable
        JOIN show_times
        ON show_times.film_table_id = FilmTable.id
        WHERE show_times.date='${dateChoice}'
        ORDER BY FilmTable.title
    `);

    for (let row of result) {
        //Plocka med visningens id från DB för att använda vid stolsbokning
        moviesToDisplay += `<li>
        <button value="${row.show_times_id}"> ${row.title} </button>
        <span class="saloon">${row.show_times_saloon}</span>
        <span class="saloonTime">${row.show_times_time}</span>
        </li>`;
        showMovies = true;
    }

    moviesToDisplay += '</ul>';

    if (showMovies) {
        $('#dateToView').html('<br>Välj film för att fortsätta:');
        $('#moviesToView').html(moviesToDisplay);
        $('#moviesToView').append('<div></div>');
    } else {
        $('#dateToView').empty();
        $('#moviesToView').html('Inga filmer visas på valt datum');
    }
}


