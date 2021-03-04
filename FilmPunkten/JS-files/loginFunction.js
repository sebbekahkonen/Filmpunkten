async function getInfo() {
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
      document.getElementById("register_href").addEventListener("click", logItOut);
    }
    else {
      $('<h4 class= "wrongLogin">Fel användarnamn eller lösenord, vänligen försök igen.<h4>').appendTo('.designLineTop');
    }
  }
  else {
    $('<h4 class= "wrongLogin">Fel användarnamn eller lösenord, vänligen försök igen.<h4>').appendTo('.designLineTop');
  }
}


function logItOut() {
  $('#login_href').attr("href", "#login");
  $('#login_href').text('Logga in');
  $('#register_href').attr("href", "#register");
  $('#register_href').text("Bli medlem");
}


function showPassword() {
  let inputShow = document.getElementById("password");
  if (inputShow.type === "password") {
    inputShow.type = "text";
  } else {
    inputShow.type = "password";
  }
}


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
    })
  }
  else {
    try {
      document.getElementById('emailExists').remove();
    } catch (err) { }
  }
}


document.getElementById("loginbutton").addEventListener("click", getInfo);
document.getElementById("checkbox1").addEventListener("click", showPassword);
document.getElementById("passwordForgot").onclick = forgotPassword;