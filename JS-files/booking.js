
/*FUNKTIONER FÖR ATT BYGGA SIDORNA*/


/*MAIN-SIDAN INITIALISERAS MED HTML FRÅN STARTSIDA.HTML (DÄR LIGGER ALLT CONTENT SOM SKA IN I CONTAINER FÖR STARTSIDA)*/

buildMainHtml();

async function buildMainHtml() {
  let html = `
    ${await $.get('startsida.html')}
  `;

  $('.container').html(html);
}

 /*NEDANSTÅENDE LÄSER AV CLICK PÅ ALLA <A>-TAGGAR OCH FÖRHINDRAR ATT DEN GÅR TILL HTML-ADRESSEN. DEN HÄMTAR
        ISTÄLLET HTML-ADRESSENS CONTENT OCH LÄGGER IN DET I CONTAINER, DÄR ALL CONTENT SKA LIGGA.*/

let dateChoice;

$(function(){
       
    $('.navigation a').click(function(e) {
        e.preventDefault();

        $.get($(this).attr("href"), function(data) {
            $(".container").html(data);
        });

    });

    $('footer a').click(function(e) {
        e.preventDefault();

        $.get($(this).attr("href"), function(data) {
            $(".container").html(data);
        });

    });

    $('.container').on("change", "#selectDate", function () {
        console.log($(this).val());
        dateChoice = new date($(this).val());
    });


});

console.log(dateChoice);
