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
document.getElementById("loginbutton").addEventListener("click", getInfo);
document.getElementById("checkbox1").addEventListener("click", showPassword);