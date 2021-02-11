let users = [{ username: "FirstAccount", password: "strongpassword" },
{
  username: "SecondAccount", password: "123"
}];


function getInfo() {
  console.log("testing");
  $('.wrongLogin').remove();
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  for (let i = 0; i < users.length; i++) {
    if (username === users[i].username && password === users[i].password) {
      $('.wrongLogin').remove();
      console.log(users[i].username + " " + users[i].password);
      return;
    }
  }
  $('<h4 class= "wrongLogin">Fel användarnamn eller lösenord, vänligen försök igen.<h4>').appendTo('.designLineTop');
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