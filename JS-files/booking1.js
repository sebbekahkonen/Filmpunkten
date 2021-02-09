
/*FUNKTIONER FÖR ATT BYGGA SIDORNA*/

buildMainHtml();

async function buildMainHtml() {
  let html = `
    ${await $.get('main.html')}
  `;

  $('body').html(html);
}



function buildBooking() {
    $('.container').html(`
        <h2 class="choiceheader">Välj datum för att boka biljetter</h2>
        <input type="date" id="datum" name="trip-start"
        value="2021-02-08"
        min="2021-01-01" max="2022-12-31"></input>
    `);
}



/*CLICK-EVENT FÖR LÄNKAR PÅ STARTSIDA*/

$('#booking').click(function () {
    buildBooking() 
});

$('#start').click(function () {
    buildMainHtml();
})



/*
async function buildBooking() {
    let htmlBooking = `
    ${await $.get('booking1.html')}
    `;

    $('.container').html(htmlBooking);
}*/



/*

let container = $('.container');

container.append(`<h2 class="choiceheader">Välj datum för att boka biljetter</h2>`);

container.append(`<input type="date" id="datum" name="trip-start"
    value="2021-02-08"
    min="2021-01-01" max="2022-12-31"></input>`
);

*/