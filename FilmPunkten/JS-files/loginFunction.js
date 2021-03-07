/*
* This is a check if username and password
* is a part of our database.
* If it is, you are now logged in
*/
async function loginCheck() {
  $('.wrongLogin').remove();
  let result = await db.run(/*sql*/`
      SELECT username,password
      FROM RegisterTable 
      `);
  let loginOkay = false;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  let foundUser = result.findIndex((user) => {
    return username === user.username;
  })

  if (foundUser > -1) {
    loginOkay = result[foundUser].password === password;
    if (loginOkay) {
      sessionStorage.setItem("user", foundUser);
      sessionStorage.setItem("result", result);
      $('#login_href').attr("href", "#myPage");
      $('#login_href').text('Min sida');
      $('#register_href').attr("href", "#Startsida");
      $('#register_href').text('Logga ut');
      location.hash = "#Startsida";
      document.getElementById("register_href").addEventListener("click", logout);
    }
    else {
      $('<h4 class= "wrongLogin">Fel användarnamn eller lösenord, vänligen försök igen.<h4>').appendTo('.designLineTop');
    }
  }
  else {
    $('<h4 class= "wrongLogin">Fel användarnamn eller lösenord, vänligen försök igen.<h4>').appendTo('.designLineTop');
  }
}



/*
* This is for the logout href in nav-bar,
* if you press "logga ut" it will change
* the href automatically
*/
function logout() {
  $('#login_href').attr("href", "#login");
  $('#login_href').text('Logga in');
  $('#register_href').attr("href", "#register");
  $('#register_href').text("Bli medlem");
}



/*
* If you have problems with typing password
* you can check the "visa lösenord" checkbox
* and see your password while typing, and you
* can uncheck it, if you are in a environment that
* requires it.
*/
function showPassword() {
  let inputShow = document.getElementById("password");
  if (inputShow.type === "password") {
    inputShow.type = "text";
  } else {
    inputShow.type = "password";
  }
}



/*
* If you have pressed "glömt ditt lösenord?"
* you navigate to this page and have to enter
* your email-adress.
*/
function forgotPassword() {
  $('main').empty();
  $('main').append(/*html*/`
  <div class= "forgotPasswordDiv">
  <h2>Återställ ditt lösenord</h2>
  <label id= "privateEmail">Ange emailadress: </label>
  <input id= "emailInput"for="privateEmail" oninput="sendEmail()">
  </div>
  `)
}



/*
* Check if email-adress is a part of 
* our database, if it is a button will
* appear and you can press it to send
* an email to the email-adress that you
* previously entered. 
* In "junk-email" you can find this email
* from "Filmpunkten"
* Note this works fully on hotmail-account,
* Not sure how it works towards gmail as I havent
* bought any domain
*/
async function sendEmail() {
  let registerTableUsername = await db.run(/*sql*/`
      SELECT username,password
      FROM RegisterTable 
      `);
  let emailToSend = document.getElementById('emailInput').value;
  let foundUser = registerTableUsername.findIndex((user) => {
    return emailToSend === user.username;
  })
  if (foundUser > -1) {
    $('#emailPtag').remove();
    $('#sendButton').remove();
    $('.forgotPasswordDiv').append(/*html*/`
      <p id= "emailPtag">Emailen finns, tryck på knappen "Skicka lösenord" för att återställa lösenord: </p>
      <button id= "sendButton">Skicka lösenord</button>
    `)
    let userPassword = registerTableUsername[foundUser].password;
    document.getElementById('sendButton').addEventListener("click", function () {
      $('#passwordSent').remove()
      if (emailToSend.includes("hotmail.com")) {
        Email.send({
          Host: "smtp-mail.outlook.com",
          Username: "filmpunkten@hotmail.com",
          Password: "newpassword123",
          To: "" + emailToSend + "",
          From: "filmpunkten@hotmail.com",
          Subject: "Återställa lösenord",
          Body: "Här är ditt lösenord: \"" + userPassword + "\"<br/><br/>Tack för att du använder Filmpunkten!<br/>Ha en fortsatt trevlig dag!"
        }).then(
          message => $('.forgotPasswordDiv').append(/*html*/`
        <h3 id= "passwordSent">Lösenordet har nu skickats ut till den angivna emailen</h3>`)
        );
      }
      if (emailToSend.includes("gmail.com")) {
        Email.send({
          Host: "smtp.gmail.com",
          Username: "filmpunkten@hotmail.com",
          Password: "newpassword123",
          To: "" + emailToSend + "",
          From: "filmpunkten@hotmail.com",
          Subject: "Återställa lösenord",
          Body: "Här är ditt lösenord: \"" + userPassword + "\"<br/><br/>Tack för att du använder Filmpunkten!<br/>Ha en fortsatt trevlig dag!"
        }).then(
          message => $('.forgotPasswordDiv').append(/*html*/`
        <h3 id= "passwordSent">Lösenordet har nu skickats ut till den angivna emailen</h3>`)
        );
      }
    })
  }
  else {
    try {
      document.getElementById('emailExists').remove();
    } catch (err) { }
  }
}



/*
* Eventlisteners for buttons and checkboxes in "login"
* Added keyup on "enter" to ease for the user
*/
document.getElementById("loginbutton").addEventListener("click", loginCheck);
document.getElementById("password").addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("loginbutton").click();
  }
});
document.getElementById("username").addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("loginbutton").click();
  }
});
document.getElementById("checkbox1").addEventListener("click", showPassword);
document.getElementById("passwordForgot").onclick = forgotPassword;