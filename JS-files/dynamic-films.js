
let dynamicPages = {

  async products() {
    // Reading the products from a json file
    let data = await $.getJSON('film.json');
    // Loop through the products and build html
    let html = '<main><h2>hej!</h2>';
    for (let film of data) {
      html += /*html*/`
        <div class="film">
          <h3>${film.name}</h3>
        
        </div>
      `;
    }
    html += '</main>';
    return html;
  }

};
/*
let dynamicPages = {
async products() {
  // Reading the products from a json file
  let data = await $.getJSON('film-position.json');
  // Loop through the products and build html
  //let html = '<main><h2>Våra tårtor</h2>';
  for (let product of data) {
    html += /*html`
      <article>
        <div class="film">
        <img src="images/films/${film.id}.jpg">
          <h3>${product.name}</h3>
      
        </div >
        </article> 
      `;
  }
  html += '</main>';
  return html;
}

};
*/