async function getInfo() {
  $('.wrongLogin').remove();
  let result = await db.run(/*sql*/`
      SELECT *
      FROM LoginTable 
      `);
  let loginOkay = false;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  let foundUser = result.findIndex((user) => {
    return username === user.username;
  })
  if (foundUser > -1) {
    loginOkay = result[foundUser].password === password;
    console.log('Found it');
    $('#login_href').attr("href", "#myPage");
    $('#login_href').text('Min sida');
    $('#register_href').attr("href", "#logout");
    $('#register_href').text('Logga ut');
    location.hash = "#Startsida";
  }
  //loginOkay === false;
  if (!loginOkay) {
    console.log("Didn't find it");
    $('<h4 class= "wrongLogin">Fel användarnamn eller lösenord, vänligen försök igen.<h4>').appendTo('.designLineTop');
  }
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

