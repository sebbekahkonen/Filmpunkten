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


function bookingInformation() {
  let movie = JSON.parse(sessionStorage.getItem("newItem"));
  $("div.addMyPages").empty();
  $(".addMyPages").append(/*html*/`
  <div class= "bookingInformation">
    <p>${movie}</p>
  </div>`);
}

async function ongoingBookingInformation() {
  $("div.addMyPages").empty();
  let booking = await db.run(/*sql*/`
  SELECT booking.*, show_times.date AS datum, show_times.film_table_id AS filmId
  FROM booking, show_times 
  WHERE booking.show_times_id = show_times.id
  `);
  let registerTable = await db.run(/*sql*/`
  SELECT * 
  FROM RegisterTable
  `)
  let filmTable = await db.run(/*sql*/`
  SELECT * 
  FROM FilmTable
  `)
  let userId = sessionStorage.getItem("user");
  let movies = [];
  console.log(booking);
  booking.forEach(function (user) {
    if (user.RegisterTable_username === registerTable[userId].username) {
      let movie = filmTable.find((film) => film.id == user.filmId);
      movie.datum = user.datum;
      movies.push(movie);
    }
  });

  movies.forEach(function (movie) {
    $(".addMyPages").append(/*html*/`
      <div class= "bookingInformation" id= "bookingInfo">
        <div class= "bookedMovie" id= "bookedMovieId">
          <label id= "bookedMovieTitle">Film: </label>
          <input for= "bookedMovieTitle" id= "movieTitle${movie.title}" value=${movie.title}>
          <label id= "bookedMovieGenre">Datum: </label>
          <input for= "bookedMovieGenre" value="${movie.datum}">
          <label id= "bookedMovieGenre">Genre: </label>
          <input for= "bookedMovieGenre" value="${movie.Genre}">
          <button onClick = "location.href = '#html-movies/${movie.title}Page'"> Filminfo</button >
        </div>
      </div>`);
  })
}


async function receiptsInformation() {
  $("div.addMyPages").empty();
  let booking = await db.run(/*sql*/`
  SELECT booking.*, show_times.date AS datum, show_times.film_table_id AS filmId
  FROM booking, show_times 
  WHERE booking.show_times_id = show_times.id
  `);
  let registerTable = await db.run(/*sql*/`
  SELECT * 
  FROM RegisterTable
  `)
  let filmTable = await db.run(/*sql*/`
  SELECT * 
  FROM FilmTable
  `)

  let movies = [];
  let userId = sessionStorage.getItem("user");
  booking.forEach(function (user) {
    if (user.RegisterTable_username === registerTable[userId].username) {
      let movie = filmTable.find((film) => film.id == user.filmId);
      movie.datum = user.datum;
      movie.bookingId = user.id;
      movie.bookingNumber = user.number;
      movies.push(movie);
    }
  });
  movies.forEach(function (movie) {
    $(".addMyPages").append(/*html*/`
      <div class= "receiptInformation">
        <div class= "receiptDiv">
          <label id= "receiptTitle">Film: </label>
          <input for= "receiptTitle" value= "${movie.title}">
          <label id= "receiptId">id: </label>
          <input for= "receiptId" value= "${movie.bookingId}">
          <label id= "receiptBookingNumber">Bokningsnummer: </label>
          <input for= "receiptBookingNumber" value= "${movie.bookingNumber}">
        </div>
      </div>`);
  })
}

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


document.getElementById("privateInfo").addEventListener("click", privateInformation);
document.getElementById("ongoingBookingInfo").addEventListener("click", ongoingBookingInformation);
document.getElementById("receiptsInfo").addEventListener("click", receiptsInformation);

