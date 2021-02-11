
/*FUNKTIONER FÖR ATT BYGGA SIDORNA*/


/*MAIN-SIDAN INITIALISERAS MED HTML FRÅN STARTSIDA.HTML (DÄR LIGGER ALLT CONTENT SOM SKA IN I CONTAINER FÖR STARTSIDA)*/

buildMainHtml();

async function buildMainHtml() {
  let html = `
    ${await $.get('Startsida.html')}
  `;

  $('.container').html(html);
}

/*
function buildBooking() {
    $('.container').html(`
        <h2 class="choiceheader">Välj datum för att boka biljetter</h2>
        <input type="date" id="datum" name="trip-start"
        value="2021-02-08"
        min="2021-01-01" max="2022-12-31"></input>
    `);
}
*/


/*CLICK-EVENT FÖR LÄNKAR PÅ STARTSIDA*/
/*
    $('#booking').click(function () {
        buildBooking()
    });

*/

$(function(){

    $('.container').on("change", "#selectDate", function (e) {
        console.log($(this).val());
    });


});


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