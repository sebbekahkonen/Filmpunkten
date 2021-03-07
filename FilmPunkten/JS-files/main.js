async function buildNavigationHTML() {
  let html = `
    ${await $.get('html-files/headerAndFooter.html')}
  `;

  $('body').append(html);
  replaceContent();
  buildMovieScheme();
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

  setTimeout(function () {
    $("main").css('min-height', $("#rightPics").height());
  }, 200);
}

//Creating Movie Scheme
async function buildMovieScheme() {

  let result = await db.run(/*sql*/`
      SELECT
          FilmTable.title,
          show_times.id AS show_times_id,
          show_times.saloon AS show_times_saloon,
          show_times.date AS show_times_date,
          show_times.time AS show_times_time
      FROM FilmTable
      JOIN show_times
      ON show_times.film_table_id = FilmTable.id
      WHERE
          show_times.date >= DATE('now')
          AND
          show_times.date <= DATE('now', '+10 days')
      ORDER BY show_times_date, show_times_time`);

  let scheme = '';
  let onDate = '';
  let onFirst = true;

  for (let row of result) {

    if (onDate != row.show_times_date) {

      if (!onFirst) {
        scheme += '</ul>';
      }
      scheme += '<ul>';
      scheme += '<li>'+row.show_times_date+'</li>';

      onDate = row.show_times_date;
      onFirst = false;
    }      
    scheme += '<li>-'+row.title+'</li>';
  }
  scheme += '</ul>';

  $('#scheme').html(scheme);
}


window.onhashchange = replaceContent;

buildNavigationHTML();
