// Class served to frontend
class db {

  static async __fetcher(method, args = []) {
    return await (await fetch('/___bestsqlite3___', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ method, args }),
    })).json();
  }

  static async run(sql, params) {
    return this.__fetcher('run', [sql, params]);
  }

  static async tables() {
    return this.__fetcher('tables');
  }

  static async views() {
    return this.__fetcher('views');
  }

}

// Class used as an adaptor in the middleware
// on backend - (getting calls from the frontend class)
class BestSqliteFrontendBackend {

  constructor(db) {
    this.db = db;
  }

  async run(sql, params) {
    return this.db.run(sql, params);
  }

  async tables() {
    return this.db.tables;
  }

  async views() {
    return this.db.views;
  }

}

// Middleware for Express
module.exports = _db => {
  let back = new BestSqliteFrontendBackend(_db);
  return (req, res, next) => {
    if (req.method === 'POST' && req.url === '/___bestsqlite3___') {
      let data = '';
      req.on('data', chunk => data += chunk);
      req.on('end', async () => {
        let body = JSON.parse(data);
        let r = await back[body.method](...body.args).catch(e => ({ error: e + '' }));
        res.json(r);
      });
      return;
    }
    if (req.method === 'GET' && req.url === '/best-sqlite3-frontend.js') {
      res.setHeader('Content-Type', 'application/javascript');
      res.send(db + '');
      return;
    }
    next();
  };
}