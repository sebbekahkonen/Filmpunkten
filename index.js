require('best-sqlite3-frontend')({
  bestSqlite3: require('best-sqlite3'),
  databasePath: 'FilmPunkten/databases/TestingForFilmpunkten.db',
  express: require('express'),
  port: 3000,
  staticFolder: 'FilmPunkten'
}).then(({ app, db }) => {

});