let username = document.getElementById('username');
let password = document.getElementById('password');
let repeatPassword = document.getElementById('repeatPassword');
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let phoneNumber = document.getElementById('phoneNumber');

let canBePressed = true;

async function createNewAccount() {
  $('.emptyFields').remove();
  console.log('Creating a new account...');
  await db.run('INSERT INTO RegisterTable (username, password, firstName, lastName, phoneNumber) VALUES (?, ?, ?, ?, ?)', [username.value, password.value, firstName.value, lastName.value, phoneNumber.value]);
}

$('.registerNow').click(function () {
  if (username.value.length == 0 || password.value.length == 0 || repeatPassword.value.length == 0 || firstName.value.length == 0 || lastName.value.length == 0 || phoneNumber.value.length == 0) {
    if (canBePressed) {
      canBePressed = false;
      $('<h4 class="emptyFields">Vänligen fyll i alla fält.<h4>').appendTo('.lineoverLabels');
    }
  } else {
    createNewAccount();
  }
});