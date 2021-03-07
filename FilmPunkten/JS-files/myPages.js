/*
* This is where you get the private information for the account
* (Name, lastname, email-adress, phonenumber).
*/
async function privateInformation() {
  let value = await db.run(/*sql*/`
  SELECT *
  FROM RegisterTable
  `)
  let user = sessionStorage.getItem("user");
  $("div.addMyPages").empty();
  $("div.addMyPages").append(/*html*/`
  <div class="privateInfoDiv">
    <div class="privateNameDiv">
      <label id="privateName">Namn:</label>
      <input id="nameInput" type="Text" for="privateName" maxlength= "15" value=${value[user].firstName} oninput="updateInformation(${user})">
    </div>
    <div class="privateLastnameDiv">
      <label id="privateLastname">Efternamn:</label>
      <input id= "lastnameInput" type="Text" for="privateLastname" maxlength= "25" value=${value[user].lastName} oninput="updateInformation(${user})">
    </div>
    <div class="privateEmailDiv">
      <label id="privateEmail">E-postadress:</label>
      <input id= "usernameInput" type="Text" maxlength="30" for="privateEmail" value=${value[user].username} readonly>
    </div>
    <div class="privateNumberDiv">
      <label id="privateNumber">Telefonnummer:</label>
      <input id= "numberInput" type="text" for="privateNumber" maxlength= "12" value=${value[user].phoneNumber} oninput="updateInformation(${user})">
    </div>
  </div>`)
}



/*
* This is where you get to change the privateinformation
* for the account.
* Added a timeout on 5seconds for update, just in case the
* database cant handle users typing-speed.
*/
async function updateInformation(user) {
  let value = await db.run(/*sql*/`
  SELECT *
  FROM RegisterTable
  `)
  let nameUpdate = document.getElementById('nameInput').value;
  let lastnameUpdate = document.getElementById('lastnameInput').value;
  let numberUpdate = document.getElementById('numberInput').value;
  setTimeout(async function () {
    if (nameUpdate != value[user].firstName) {
      await db.run('BEGIN TRANSACTION');
      await db.run('UPDATE RegisterTable SET firstName = (?) WHERE username = (?)', [nameUpdate, value[user].username]);
      await db.run('COMMIT');
    }
    if (lastnameUpdate != value[user].lastName) {
      await db.run('BEGIN TRANSACTION');
      await db.run('UPDATE RegisterTable SET lastName = (?) WHERE username = (?)', [lastnameUpdate, value[user].username]);
      await db.run('COMMIT');
    }
    if (numberUpdate != value[user].phoneNumber) {
      await db.run('BEGIN TRANSACTION');
      await db.run('UPDATE RegisterTable SET phoneNumber = (?) WHERE username = (?)', [numberUpdate, value[user].username]);
      await db.run('COMMIT');
    }
  }, 5000);
}



/*
* This is where you get active-bookings information,
* it changes live if you book a movie
*/
async function ongoingBookingInformation() {
  $("div.addMyPages").empty();
  let booking = await db.run(/*sql*/`
  SELECT booking.*, show_times.date AS datum, 
  show_times.film_table_id AS filmId
  FROM booking, show_times 
  WHERE booking.show_times_id = show_times.id
  `);
  let registerTable = await db.run(/*sql*/`
  SELECT * 
  FROM RegisterTable
  `)
  let userId = sessionStorage.getItem("user");
  let findUser = booking.findIndex((thisUser) => thisUser.RegisterTable_username == registerTable[userId].username);
  if (findUser > -1) {
    let booking_seat = await db.run(/*sql*/`
  SELECT * 
  FROM booking_seat
  `)
    let filmTable = await db.run(/*sql*/`
  SELECT * 
  FROM FilmTable
  `)
    movies = [];
    let seats = [];
    let userNumber = [];
    let movieSeat = [];
    booking_seat.forEach(function (seat) {
      seats.push(seat);
    })
    booking.forEach(async function (user) {
      let seatArray = [];
      if (user.RegisterTable_username === registerTable[userId].username) {
        let movie = filmTable.find((film) => film.id == user.filmId);
        for (let i = 0; i < seats.length; i++) {
          if (seats[i].booking_id == user.id) {
            seatArray.push(seats[i].seat);
          }
        }
        movieSeat.push(seatArray);
        userNumber.push(user.number);
        movie.datum = user.datum;
        movie.bookingNumber = user.number;
        movie.seat = seatArray;
        movie.userName = user.RegisterTable_username;
        movies.push(movie);
        localStorage.setItem("movies", JSON.stringify(movies));
      }
    });
    let numberplus = 0;
    movies.forEach(async function (movie) {
      $(".addMyPages").append(/*html*/`
      <div class= "bookingInformation" id= "bookingInfo">
        <div class= "bookedMovie" id= "bookedMovieId${userNumber[numberplus]}">
          <label id= "bookedMovieTitle">Film: </label>
          <input for= "bookedMovieTitle" id= "movieTitle${movie.title}" value="${movie.title}" readonly>
          <label id= "bookedMovieDate">Datum: </label>
          <input for= "bookedMovieDate" value="${movie.datum}" readonly>
          <label id= "bookedMovieSpot">Plats: </label>
          <input for= "bookedMovieSpot" value="${movieSeat[numberplus]}" readonly>
          <label id= "bookedMovieSpot">Avboka?: </label>
          <input for= "bookedMovieSpot" value=" ${userNumber[numberplus]}" readonly>
        </div>
      </div>`);
      numberplus++;
    })
    $(".addMyPages").append(/*html*/`
  <h4 id="cancelMovieh4">Skulle du vilja avboka en film?</h4>
  <label id= "cancelNumber">Bokningsnummer: </label>
  <input for="cancelNumber" id="inputBookingNumber" onInput="cancelMovie()">
  `);
  }
  else {
    $(".addMyPages").append(/*html*/`
    <h4>Du har inga aktiva bokningar</h4>
    <button onClick= "window.location.hash= '#booking'">Boka här</button>
    `);
  }
}



/*
* This is where you cancel active-bookings,
* you type in the bookingnumber for the movie
* it will cancel booking the active booking
* and remove it from the database aswell.
*/
async function cancelMovie() {
  let booking = await db.run(/*sql*/`
  SELECT booking.*, show_times.date AS datum, 
  show_times.film_table_id AS filmId
  FROM booking, show_times 
  WHERE booking.show_times_id = show_times.id
  `);
  let bookingNum = document.getElementById("inputBookingNumber").value
  let bookingTableIndex = booking.findIndex((num) => num.number == bookingNum);
  if (bookingTableIndex > -1) {
    $(".addMyPages").append(/*html*/`
    <button id= "cancelButton">Avboka</button>
    `)
    document.getElementById('cancelButton').addEventListener("click", async function () {
      let removeThis = "bookedMovieId" + booking[bookingTableIndex].number + "";
      document.getElementById('' + removeThis + '').remove();
      await db.run('BEGIN TRANSACTION');
      await db.run(/*sql*/`
      DELETE FROM booking WHERE booking.number LIKE '${bookingNum}';
    `);
      await db.run('COMMIT');
      document.getElementById('cancelButton').remove();
    })
  } else {
    try {
      document.getElementById('cancelButton').remove();
    } catch (e) { }
  }
}



/*
* This is where you save the receipt for the
* user that is logged in. 
* Saving it in localstorage to keep information
* even if you refresh the page
*/
async function receiptsInformation() {
  $("div.addMyPages").empty();
  let registerTable = await db.run(/*sql*/`
  SELECT * 
  FROM RegisterTable
  `)
  let getMovies = JSON.parse(localStorage.getItem("movies"));
  let userId = sessionStorage.getItem("user");
  getMovies.forEach(function (movie) {
    if (movie.userName === registerTable[userId].username) {
      $(".addMyPages").append(/*html*/`
      <div class= "receiptInformation">
        <div class= "receiptDiv">
          <label id= "receiptTitle">Film: </label>
          <input for= "receiptTitle" value= "${movie.title}" readonly>
          <label id= "receiptSpot">Plats: </label>
          <input for= "receiptSpot" value= "${movie.seat}" readonly>
          <label id= "receiptBookingNumber">Bokningsnummer: </label>
          <input for= "receiptBookingNumber" value= "${movie.bookingNumber}" readonly>
        </div>
      </div>`);
    }
    if (movie.userName !== registerTable[userId].username) {
      try {
        document.getElementById("noMovies").remove();
        document.getElementById("noMoviesButton").remove();
      } catch (e) { }
      $(".addMyPages").append(/*html*/`
      <h4 id = "noMovies" > Du har inga kvitton eftersom du aldrig sett en film hos oss, tryck på knappen för att komma igång!</h4 >
      <button id="noMoviesButton" onClick="window.location.hash= '#booking'">Boka här</button>
    `);
    }
  });
}



/*
* Eventlisteners for navigation in myPages tabs
*/
document.getElementById("privateInfo").addEventListener("click", privateInformation);
document.getElementById("ongoingBookingInfo").addEventListener("click", ongoingBookingInformation);
document.getElementById("receiptsInfo").addEventListener("click", receiptsInformation);