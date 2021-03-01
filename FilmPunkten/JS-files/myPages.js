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
  console.log(user);
}


function bookingInformation() {
  $("div.addMyPages").empty();
  $(".addMyPages").append(/*html*/`
  <div class= "bookingInformation">
    <p>HistorikIsWorking</p>
  </div>`);
}

async function ongoingBookingInformation() {
  let movieBooking = await db.run(/*sql*/`
  SELECT *
  FROM booking
  `);
  let showTimes = await db.run(/*sql*/`
  SELECT * 
  FROM show_times
  `)
  let thisuser = await db.run(/*sql*/`
  SELECT * 
  FROM RegisterTable
  `)
  let userSeats = await db.run(/*sql*/`
  SELECT * 
  FROM booking_seat
  `)
  let AllMovies = await db.run(/*sql*/`
  SELECT * 
  FROM FilmTable
  `)
  let saveBookingId = [];
  let saveBookingMovie = [];
  let num = 0;
  let num1 = 0;
  let userId = sessionStorage.getItem("user");

  $("div.addMyPages").empty();
  movieBooking.forEach(function (booking) {
    if (booking.RegisterTable_username === thisuser[userId].username) {
      saveBookingId[num] = booking.id;
      saveBookingMovie[num] = booking.show_times_id;
      num++;
    }
  });
  AllMovies.forEach(function (movie) {
    if (movie.id === saveBookingMovie[num1]) {
      $(".addMyPages").append(/*html*/`
        <div class= "bookingInformation">
          <div class= "bookedMovie">
            <label id= "bookedMovieTitle">Film: </label>
            <input for= "bookedMovieTitle" id= "movieTitle" value=${movie.title}>
            <label id= "bookedMovieGenre">Genre: </label>
            <input for= "bookedMovieGenre" value="${movie.Genre}">
            <button onClick= "location.href = '#html-movies/${movie.title}Page'">Filminfo</button>
            <button onClick= "getMovieInfo()">Avboka</button>
          </div>
        </div>`);
      num1++;
      //    <label id= "bookedMovieSeat">Plats: </label>
      //    <input for= "bookedMovieSeat" value= ""></input>
    }
  })

  // let num2 = 0;
  // userSeats.forEach(function (userBookingId) {
  //   for (let i = 0; i < saveBookingId.length; i++) {
  //     if (userBookingId.booking_id === saveBookingId[i]) {
  //       if (userBookingId.booking_id === userBookingId.booking_id) {
  //         console.log("it works");
  //       }
  //       $(".addMyPages").append(/*html*/`
  //       <div class= "bookingInformation">
  //         <div class= "bookedMovie">
  //           <label id= "bookedMovieTitle">Film: </label>
  //           <input for= "bookedMovieTitle" value="${saveBookingMovie[num2]}">
  //           <label id= "bookedMovieSeat">Plats: </label>
  //           <input for= "bookedMovieSeat" value= "${userBookingId.seat}">
  //           <label id= "bookedMovieTickets">Biljett: </label>
  //           <input for= "bookedMovieTickets" value="Vuxen/barn/pensionär">
  //           <button>Ändra</button>
  //           <button>Avboka</button>
  //         </div>
  //       </div>`);
  //     }
  //   }
  // })
}

function getMovieInfo() {
  let movieInfo = document.getElementById('movieTitle').value;
  console.log(movieInfo);
}


function receiptsInformation() {
  $("div.addMyPages").empty();
  $(".addMyPages").append(/*html*/`
  <div class= "bookingInformation">
    <p>Kvitton is working</p>
  </div>`);
}

async function updateInformation(user) {
  let value = await db.run(/*sql*/`
  SELECT *
  FROM RegisterTable
  `)
  let nameUpdate = document.getElementById('nameInput').value;
  let lastnameUpdate = document.getElementById('lastnameInput').value;
  let numberUpdate = document.getElementById('numberInput').value;
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
}






document.getElementById("privateInfo").addEventListener("click", privateInformation);
document.getElementById("bookingInfo").addEventListener("click", bookingInformation);
document.getElementById("ongoingBookingInfo").addEventListener("click", ongoingBookingInformation);
document.getElementById("receiptsInfo").addEventListener("click", receiptsInformation);

