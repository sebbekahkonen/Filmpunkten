let username = document.getElementById('username');
let password = document.getElementById('password');
let repeatPassword = document.getElementById('repeatPassword');
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let phoneNumber = document.getElementById('phoneNumber');

let usernameIsOkay = false;
let passwordIsOkay = false;
let repeatPasswordIsOkay = false;
let firstNameIsOkay = false;
let lastNameIsOkay = false;
let phoneNumberIsOkay = false;

function checkUsernameLength(usrnme) {
  if (usrnme.length < 10 || usrnme.length > 30) {
    $('.usernameMessage').html('');
    $('<h5 class="popupMessage">Ditt användarnamn måste bestå av 10-30 tecken!</h5>').appendTo('.usernameMessage');
  } else {
    $('.usernameMessage').html('');
    usernameIsOkay = true;
  }
}

function checkPasswordLength(psswrd) {
  if (psswrd.length < 8 || psswrd.length > 25) {
    $('.passwordMessage').html('');
    $('<h5 class="popupMessage">Ditt lösenord måste bestå av 8-25 tecken!</h5>').appendTo('.passwordMessage');
  } else {
    $('.passwordMessage').html('');
    passwordIsOkay = true;
  }
}

function checkRepeatedPassword() {
  if (repeatPassword.value !== password.value && repeatPassword.value !== '') {
    $('.repeatPasswordMessage').html('');
    $('<h5 class="popupMessage">Lösenorden matchar inte!</h5>').appendTo('.repeatPasswordMessage');
  } else {
    $('.repeatPasswordMessage').html('');
    repeatPasswordIsOkay = true;
  }
}

function checkFirstName(frstNme) {
  if (/[^a-zA-Z]/.test(frstNme)) {
    $('.firstNameMessage').html('');
    $('<h5 class="popupMessage">Ditt förnamn får bara innehålla bokstäver!</h5>').appendTo('.firstNameMessage');
  } else if (frstNme.length < 2 || frstNme.length > 20) {
    $('.firstNameMessage').html('');
    $('<h5 class="popupMessage">Ditt förnamn måste bestå av 2-20 tecken!</h5>').appendTo('.firstNameMessage');
  } else {
    $('.firstNameMessage').html('');
    firstNameIsOkay = true;
  }
}

function checkLastName(lstNme) {
  if (/[^a-zA-Z]/.test(lstNme)) {
    $('.lastNameMessage').html('');
    $('<h5 class="popupMessage">Ditt efternamn får bara innehålla bokstäver!</h5>').appendTo('.lastNameMessage');
  } else if (lstNme.length < 2 || lstNme.length > 25) {
    $('.lastNameMessage').html('');
    $('<h5 class="popupMessage">Ditt efternamn måste bestå av 2-25 tecken!</h5>').appendTo('.lastNameMessage');
  } else {
    $('.lastNameMessage').html('');
    lastNameIsOkay = true;
  }
}

function checkPhoneNumber(phnenmbr) {
  if (!/^\d+$/.test(phnenmbr)) {
    $('.phoneNumberMessage').html('');
    $('<h5 class="popupMessage">Ditt telefonnummer får bara innehålla siffror!</h5>').appendTo('.phoneNumberMessage');
  } else if (phnenmbr.length < 10 || phnenmbr.length > 12) {
    $('.phoneNumberMessage').html('');
    $('<h5 class="popupMessage">Ditt telefonnummer måste bestå av 10-12 tecken!</h5>').appendTo('.phoneNumberMessage');
  } else {
    $('.phoneNumberMessage').html('');
    phoneNumberIsOkay = true;
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
  $('.popupMessage').remove();
  await db.run('INSERT INTO RegisterTable (username, password, firstName, lastName, phoneNumber) VALUES (?, ?, ?, ?, ?)', [username.value, password.value, firstName.value, lastName.value, phoneNumber.value]);
  console.log('A new account has been created!');
  username.value = '';
  password.value = '';
  repeatPassword.value = '';
  firstName.value = '';
  lastName.value = '';
  phoneNumber.value = '';
  $('<h4 class="popupMessage">Ditt konto har skapats!<h4>').appendTo('.lineoverLabels');
  $('.popupMessage').css("color", "green");
}

$('.registerNow').click(function () {
  if (username.value.length == 0 || password.value.length == 0 || repeatPassword.value.length == 0 || firstName.value.length == 0 || lastName.value.length == 0 || phoneNumber.value.length == 0) {
    $('.popupMessage').remove();
    $('<h4 class="popupMessage">Vänligen fyll i alla fält.<h4>').appendTo('.lineoverLabels');
  } else if (usernameIsOkay && passwordIsOkay && repeatPasswordIsOkay && firstNameIsOkay && lastNameIsOkay && phoneNumberIsOkay) {
    createNewAccount();
  }
});