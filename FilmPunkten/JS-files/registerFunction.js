let username = document.getElementById('username');
let password = document.getElementById('password');
let repeatPassword = document.getElementById('repeatPassword');
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let phoneNumber = document.getElementById('phoneNumber');

let canBePressed = true;

function checkUsernameLength(usrnme) {
  if (usrnme.length < 10 || usrnme.length > 30) {
    alert('Ditt användarnamn måste bestå av 10-30 tecken!');
  }
}

function checkPasswordLength(psswrd) {
  if (psswrd.length < 8 || psswrd.length > 25) {
    alert('Ditt lösenord måste bestå av 8-25 tecken!');
  }
}

function checkRepeatedPassword(rptdPsswrd) {
  if (rptdPsswrd !== password.value) {
    alert('Lösenorden matchar inte!');
  }
}

function checkFirstName(frstNme) {
  if (frstNme.length < 2 || frstNme.length > 20) {
    alert('Ditt förnamn måste bestå av 2-20 tecken!');
  }
}

function checkLastName(lstNme) {
  if (lstNme.length < 2 || lstNme.length > 25) {
    alert('Ditt efternamn måste bestå av 2-25 tecken!');
  }
}

function checkPhoneNumber(phnenmbr) {
  if (phnenmbr.length < 10 || phnenmbr.length > 12) {
    alert('Ditt telefonnummer måste bestå av 10-12 tecken!');
  }
}

//Prevents white spaces
function checkSpace(event) {
  if (event.which == 32) {
    event.preventDefault();
    return false;
  }
}

async function createNewAccount() {
  $('.emptyFields').remove();
  console.log('Creating a new account...');
  await db.run('INSERT INTO RegisterTable (username, password, firstName, lastName, phoneNumber) VALUES (?, ?, ?, ?, ?)', [username.value, password.value, firstName.value, lastName.value, phoneNumber.value]);
}

$('.registerNow').click(function () {
  if (username.value.length == 0 || password.value.length == 0 || repeatPassword.value.length == 0 || firstName.value.length == 0 || lastName.value.length == 0 || phoneNumber.value.length == 0) {
    $('.emptyFields').remove();
    $('<h4 class="emptyFields">Vänligen fyll i alla fält.<h4>').appendTo('.lineoverLabels');
  } else if (username.value.length < 5 || username.value.length > 12) {
    $('.emptyFields').remove();
    $('<h4 class="emptyFields">Det finns fält som har för få/många tecken.<h4>').appendTo('.lineoverLabels');
  } else {
    createNewAccount();
  }
});