let express, bestSqlite3;
const middleware = require('./middleware.js');

class MyServer {

  static async start(
    port = 3000,
    staticFolder = 'www',
    databasePath = 'db.sqlite3',
    dbFunctions = {}
  ) {
    const db = await bestSqlite3.connect(databasePath);
    const app = this.setupExpress(port, staticFolder, db);
    this.registerDbFunctions(db, dbFunctions);
    return { app, db };
  }

  static registerDbFunctions(db, functions) {
    // user defined functions to register
    // register the functions
    for (let f in functions) {
      db.regFunc(f, functions[f]);
    }
  }

  static setupExpress(port, staticFolder, db) {
    const app = express();
    app.use(middleware(db));
    app.use(express.static(staticFolder));
    app.listen(port, () =>
      console.log('Listening on port ' + port));
    return app;
  }

}

module.exports = async (settings) => {
  express = settings.express;
  bestSqlite3 = settings.bestSqlite3;
  if (!express || !bestSqlite3) {
    throw new Error('dependencies missing!');
  }
  let { port, staticFolder, databasePath } = settings;
  return await MyServer.start(
    port,
    staticFolder,
    databasePath,
    settings.addDatabaseFunctions
  );
}