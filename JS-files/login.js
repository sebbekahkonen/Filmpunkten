console.log('hej');

buildMainHtml();

console.log('hej');

async function buildMainHtml() {
  let html = `
    ${await $.get('main.html')}
  `;

  $('body').html(html);
}



function buildLogin() {

  $('.container').html(/*html*/`
    <hr class="designLineTop">
    <div class="username">
      <label>Användarnamn (E-postadress)</label>
      <input type="text" placeholder="Användarnamn">
    </div>
    <div class="password">
      <label>Lösenord</label>
      <input type="text" placeholder="Lösenord">
      <a href="Just trying" class="forgot">glömt ditt lösenord?</a>
    </div>

    <button class="login">Logga in</button>
    <h3 class="ellerLine"><span>eller</span></h2>
     

    <button class="register">Registrera dig</button>
    <hr class="designLineBottom">
    </hr>
    `);
}
/*
  $('.container').html(`
        <div class="container">
    <h2 class="title">FilmPunkten</h2>
    <hr class="designLineTop">
    <div class="username">
      <label>Användarnamn (E-postadress)</label>
      <input type="text" placeholder="Användarnamn">
    </div>
    <div class="password">
      <label>Lösenord</label>
      <input type="text" placeholder="Lösenord">
      <a href="Just trying" class="forgot">glömt ditt lösenord?</a>
    </div>

    <button class="login">Logga in</button>

    <div class="lineContainer">
      <h2 class="lineEller"> eller </h2>
      <hr class="line">
      </hr>
    </div>

    <button class="register">Registrera dig</button>
    <hr class="designLineBottom">
    </hr>
  </div>
    `);
}
*/

/*
$('body').append(`<div class= "Login-border"></div>`);
$('body').append('<hr class= "designLineTop"></hr>');

$('body').append(`<div class= "username">
<label>Användarnamn(E-postadress)</label>
<input type="text" placeholder="Användarnamn">
</div>`);

$('body').append(`<div class= "password">
<label>Lösenord</label>
<input type="text" placeholder="Lösenord">
<a href= "Just trying" class= "forgot">glömt ditt lösenord?</a>
</div>`);

$('body').append('<button class="login">Logga in</button>');

$('body').append(`<div class= "lineContainer">
<h2 class= "lineEller"> eller </h2>
<hr class= "line"></hr>
</div>`);

$('body').append('<button class= "register">Registrera dig</button>');

$('body').append('<hr class= "designLineBottom"></hr>');

$('body').append('<h1 class= "title">Filmpunkten</h1>');
$('body').append('<img src= "images/Filmpunkten.jpg" class= "titlePicture"></img>');
*/