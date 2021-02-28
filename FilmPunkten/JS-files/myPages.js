async function privateInformation() {
  let value = await db.run(/*sql*/`
  SELECT *
  FROM RegisterTable
  `)

  let user = sessionStorage.getItem("user");
  // $('.privateInfoDiv').remove();
  $("div.addMyPages").empty();
  $("div.addMyPages").append(/* html */`
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
  $(".addMyPages").append(/* html */`
  <div class= "bookingInformation">
    <p>HistorikIsWorking</p>
  </div>`);
}

async function ongoingBookingInformation() {
  let movies = await db.run(/*sql*/`
  SELECT *
  FROM booking
  `);
  let thisuser = await db.run(/*sql*/`
  SELECT * 
  FROM RegisterTable
  `)
  let saveSeats = [];

  $("div.addMyPages").empty();
  let userId = sessionStorage.getItem("user");
  for (let i = 0; i < movies.length; i++) {
    if (thisuser[userId].username === movies[i].LoginTable_username) {
      console.log("saved");
      saveSeats[i] = movies[i].seat;
      $(".addMyPages").append(/* html */`
    <div class= "bookingInformation">
      <div class= "bookedMovie">
        <label id= "bookedMovieTitle">Film: </label>
        <input for= "bookedMovieTitle" value="TheTitle">
        <label id= "bookedMovieTickets">Biljett: </label>
        <input for= "bookedMovieTickets" value="Vuxen/barn/pensionär">
        <button>Ändra</button>
        <button>Avboka</button>
      </div>
    </div>`);
    }
  }
  if (saveSeats.length === 0) {
    $(".addMyPages").append(/* html */`
      <div class= "noBookings">
        <h3>Du har inga bokningar för tillfället.</h3>
      </div>
    `)
  }
}


function receiptsInformation() {
  $("div.addMyPages").empty();
  $(".addMyPages").append(/* html */`
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
    let thisval = await db.run('UPDATE RegisterTable SET firstName = (?) WHERE username = (?)', [nameUpdate, value[user].username]);
    await db.run('COMMIT');

    /* DESSA SKA BORT, BARA CHECK FOR NOW */
    console.log("updatedName");
    console.log(thisval);
  }
  if (lastnameUpdate != value[user].lastName) {
    await db.run('BEGIN TRANSACTION');
    let thisval = await db.run('UPDATE RegisterTable SET lastName = (?) WHERE username = (?)', [lastnameUpdate, value[user].username]);
    await db.run('COMMIT');

    /* DESSA SKA BORT, BARA CHECK FOR NOW */
    console.log(thisval);
    console.log("updatedLastname");
  }
  if (numberUpdate != value[user].phoneNumber) {
    await db.run('BEGIN TRANSACTION');
    let thisval = await db.run('UPDATE RegisterTable SET phoneNumber = (?) WHERE username = (?)', [numberUpdate, value[user].username]);
    await db.run('COMMIT');

    /* DESSA SKA BORT, BARA CHECK FOR NOW */
    console.log(thisval);
    console.log("updatedNumber");
  }
}






document.getElementById("privateInfo").addEventListener("click", privateInformation);
document.getElementById("bookingInfo").addEventListener("click", bookingInformation);
document.getElementById("ongoingBookingInfo").addEventListener("click", ongoingBookingInformation);
document.getElementById("receiptsInfo").addEventListener("click", receiptsInformation);

