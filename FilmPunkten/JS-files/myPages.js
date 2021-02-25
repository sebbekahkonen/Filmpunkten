async function privateInformation() {
  let value = await db.run(/*sql*/`
  SELECT *
  FROM RegisterTable
  `)

  let user = sessionStorage.getItem("user");
  $('.privateInfoDiv').remove();
  $('main').append(`
  <div class="privateInfoDiv">
    <div class="privateNameDiv">
      <label id="privateName">Namn:</label>
      <input id="nameInput" type="Text" for="privateName" value=${value[user].firstName} oninput="updateInformation(${user})">
    </div>
    <div class="privateLastnameDiv">
      <label id="privateLastname">Efternamn:</label>
      <input id= "lastnameInput" type="Text" for="privateLastname" value=${value[user].lastName} oninput="updateInformation(${user})">
      </div>
    <div class="privateEmailDiv">
      <label id="privateEmail">E-postadress:</label>
      <input id= "usernameInput" type="Text" maxlength="35" for="privateEmail" value=${value[user].username} readonly>
      </div>
    <div class="privateNumberDiv">
      <label id="privateNumber">Telefonnummer:</label>
      <input id= "numberInput" type="text" for="privateNumber" value=${value[user].phoneNumber} oninput="updateInformation(${user})">
      </div>
  </div>`)
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

function bookingInformation() { }

function ongoingBookingInformation() { }

function receiptsInformation() { }


document.getElementById("privateInfo").addEventListener("click", privateInformation);
document.getElementById("bookingInfo").addEventListener("click", bookingInformation);
document.getElementById("ongoingBookingInfo").addEventListener("click", ongoingBookingInformation);
document.getElementById("receiptsInfo").addEventListener("click", receiptsInformation);

