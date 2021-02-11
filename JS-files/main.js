
/*FUNKTIONER FÖR ATT BYGGA SIDORNA*/


/*MAIN-SIDAN INITIALISERAS MED HTML FRÅN STARTSIDA.HTML (DÄR LIGGER ALLT CONTENT SOM SKA IN I CONTAINER FÖR STARTSIDA)*/

buildMainHtml();

async function buildMainHtml() {
  let html = `
    ${await $.get('Startsida.html')}
  `;

  $('.container').html(html);
}


$(function () {
  /*NEDANSTÅENDE LÄSER AV CLICK PÅ ALLA <A>-TAGGAR OCH FÖRHINDRAR ATT DEN GÅR TILL HTML-ADRESSEN. DEN HÄMTAR
  ISTÄLLET HTML-ADRESSENS CONTENT OCH LÄGGER IN DET I CONTAINER, DÄR ALL CONTENT SKA LIGGA.*/
  $('.navigation a').click(function (e) {
    e.preventDefault();

    $.get($(this).attr("href"), function (data) {
      $(".container").html(data);
    });

  });

  $('footer a').click(function (e) {
    e.preventDefault();

    $.get($(this).attr("href"), function (data) {
      $(".container").html(data);
    });

  });
}

/*
buildMainHtml();

async function buildMainHtml() {
  let html = `
    ${await $.get('main.html')}
  `;

  $('body').append(html);
}


async function buildNavigation() {
  let html = `
    ${await $.get('html-files/header.html')}
    <main></main>
    ${await $.get('html-files/footer.html')}
  `;
  $('body').append(html);
  replaceMain();
}


let savedCache = {};


async function replaceMain() {
  $('header nav a').removeClass('active');
  $(`a[href="${location.hash}"]`).addClass('active');

  let fileName = 'html-files/' + location.hash.slice(1) + '.html';

  let html;
  if (savedCache[fileName]) {
    html = savedCache[fileName];
  }
  else {
    html = await $.get(fileName).catch(e => 'error');
  }
  html = await $.get(fileName).catch(e => 'error');

  if (html === 'error') {
    location.hash = '#start';
  }
  else {
    savedCache[fileName] = html;
    $('main').replaceWith(html);
  }
}


window.onhashchange = replaceMain;

buildNavigation();

*/