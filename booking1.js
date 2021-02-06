$('body').append(`<div class="container"></div>`);

$('body').append(`<h2 class="choiceheader">Välj datum för att se vilka filmer som visas</h2>`);



$('body').append(`
  <div class="dateChoice">
    <select id="selectyear">
      <option value="selectyear">År</option>
    </select>
    <select id="selectmonth">
      <option value="selectmonth">Månad</option>
    </select>
    <select id="selectday">
      <option value="selectday">Dag</option>
    </select>
  </div>
`);