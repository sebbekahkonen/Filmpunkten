require('best-sqlite3-frontend')({
  bestSqlite3: require('best-sqlite3'),
  databasePath: 'FilmPunkten/databases/Filmpunkten.db',
  express: require('express'),
  port: 3000,
  staticFolder: 'FilmPunkten'
}).then(({ app, db }) => {

});