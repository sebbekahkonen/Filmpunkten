
let container = $('.container');

container.append(`<h2 class="choiceheader">Välj datum för att boka biljetter</h2>`);

container.append(`<input type="date" id="datum" name="trip-start"
    value="2021-02-08"
    min="2021-01-01" max="2022-12-31"></input>`
);

