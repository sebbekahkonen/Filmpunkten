async function buildNavigationHTML() {
  let html = `
    ${await $.get('html-files/headerAndFooter.html')}
    <main></main>
  `;

  $('body').append(html);
  replaceContent();
}

let savedCache = {};


async function replaceContent() {
  $('header .navigation a').removeClass('active');
  $(`a[href="${location.hash}"]`).addClass('active');

  let fileName = 'html-files/' + location.hash.slice(1) + '.html';

  let html;
  if (savedCache[fileName]) {
    html = savedCache[fileName];
  }
  else {
    html = await $.get(fileName).catch(e => 'error');
  }

  if (html === 'error') {
    location.hash = '#Startsida';
  }
  else {
    savedCache[fileName] = html;
    $('main').replaceWith(html);
  }
}


window.onhashchange = replaceContent;

buildNavigationHTML();