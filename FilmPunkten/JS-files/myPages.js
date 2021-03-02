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
  SELECT *
  FROM booking
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
  let movieId = [];
  let seatId = [];
  let saveSeat = [];
  let movies = [];
  let num = 0;
  booking.forEach(function (user) {
    if (user.RegisterTable_username === registerTable[userId].username) {
      movieId[num] = user.show_times_id;
      seatId[num] = user.id;
      num++;
    }
  });

  let num2 = 0;
  filmTable.forEach(function (movie) {
    if (movie.id === movieId[num2]) {
      movies[num2] = movie;
      num2++;
    }
  });

  movies.forEach(function (movie) {
    $(".addMyPages").append(/*html*/`
      <div class= "bookingInformation" id= "bookingInfo">
        <div class= "bookedMovie" id= "bookedMovieId">
          <label id= "bookedMovieTitle">Film: </label>
          <input for= "bookedMovieTitle" id= "movieTitle${movie.title}" value=${movie.title}>
          <label id= "bookedMovieGenre">Genre: </label>
          <input for= "bookedMovieGenre" value="${movie.Genre}">
          <button onClick = "location.href = '#html-movies/${movie.title}Page'"> Filminfo</button >
        </div>
      </div>`);
  })
}

async function cancelMovie() {
  document.getElementById('cancelText').remove();
  document.getElementById('cancelButton').remove();
  $(".addMyPages").append(/*html*/`
  <h4 id= 'cancelMovieText'>Skriv in titeln på filmen du vill avboka:</h4>
  <input id= 'cancelMovie'>
  `);
  let movieTitle = "movieTitle";
  let movie = JSON.parse(sessionStorage.getItem("newItem"));
  let movieInput = document.getElementById('cancelMovie');
  movieInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      for (let i = 0; i < movie.length; i++) {
        console.log(i);
        if (document.getElementById('movieTitle' + i).value === movieInput.value) {
          document.getElementById('bookingInfo' + i).remove();
          if (document.getElementById('noMovie')) { document.getElementById('noMovie').remove() };
          console.log("it worked " + movieInput.value + "");
          return;
        }
      }
      $(".addMyPages").append(/*html*/`
      <h5 id= 'noMovie'>Finns ingen film vid namn ${movieInput.value}<h5>
      `);
      console.log("it didnt work");
    }
  })
}


async function receiptsInformation() {
  $("div.addMyPages").empty();
  let booking = await db.run(/*sql*/`
  SELECT *
  FROM booking
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
  booking.forEach(function (bookingBooked) {
    if (bookingBooked.RegisterTable_username === registerTable[userId].username) {
      filmTable.forEach(function (movie) {
        if (movie.id === bookingBooked.show_times_id) {
          $(".addMyPages").append(/*html*/`
          <div class= "receiptInformation">
            <div class= "receiptDiv">
              <label id= "receiptTitle">Film: </label>
              <input for= "receiptTitle" value= "${movie.title}">
              <label id= "receiptId">id: </label>
              <input for= "receiptId" value= "${bookingBooked.id}">
              <label id= "receiptBookingNumber">Bokningsnummer: </label>
              <input for= "receiptBookingNumber" value= "${bookingBooked.number}">
            </div>
          </div>`);
        }
      })
    }
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
document.getElementById("ongoingBookingInfo").addEventListener("click", ongoingBookingInformation);
document.getElementById("receiptsInfo").addEventListener("click", receiptsInformation);

