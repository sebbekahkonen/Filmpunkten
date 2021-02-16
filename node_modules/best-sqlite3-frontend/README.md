# best-sqlite3-frontend

**best-sqlite3-frontend** is a package that lets your write database queries to SQLite using the [best-sqlite3](https://www.npmjs.com/package/best-sqlite3) driver, but from the frontend (code you run in the browser), instead of the backend.

**Please Note:** The implications of letting frontend code run any db query is that anyone can hack your database! So this module is *not for production*! (Unless you combine in with writing very restrictive and thorough ACL middleware). 

The module is written as Express middleware and with the goal of minimizing the amount of code needed to setup a backend.

The purpose of this module is to let beginners focus on writing frontend code with some database queries in, without having to  grasp the concepts of backend routes and REST interfaces just yet!

### Installation
In an empty folder do:

```
npm init -y
npm i express
npm i best-sqlite3
npm i best-sqlite-frontend
```

### Add an index.js file
Add an index.js file to your project. It will contain your backend/server code:

#### index.js

```js
require('best-sqlite3-frontend')({
  bestSqlite3: require('best-sqlite3'),
  databasePath: 'databases/chinook.db',
  addDatabaseFunctions: {
    // example of user defined functions
    // (write your own as you go...)
    UP: x => x.toUpperCase(),
    LOW: x => x.toLowerCase()
  },
  express: require('express'),
  port: 3000,
  staticFolder: 'www'
}).then(({ app, db }) => {
  // if you want to you can
  // do more things with the express app 
  // and the db connection here...
});
```
You can change these settings if you want to:
* **databasePath**: Where your SQLite database file is located.
* **addDatabaseFunctions**: You don't have to add any database functions. But the ones you add can be used in your database queries. In our example we add functions (UP and LOW) for converting text to uppper- and lowercase, since JavaScript is better at doing this with letters that are not a-z (like åäö in the Swedish alphabet) than the build in functions UPPER and LOWER in SQLite are.
* **port** - which port the web server will run on.
* **staticFolder** - the folder that contains files you want to serve (html, css, images, js etc)

### Add a database file
To make things work with the example settings above: 
* Create a subfolder called **databases**
* Download the example database [chinook](https://www.sqlitetutorial.net/sqlite-sample-database/) and place it in that folder (with the name *chinook.db*).

To make things work with the example settings above: 
* Create a subfolder called **www**. This is the folder in which you will have all your frontend code.
* Add the following two files in that folder.

#### index.html
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="data:;base64,iVBORw0KGgo=">
  <title>Example: Database queries</title>
</head>

<body>
  <script src="/best-sqlite3-frontend.js"></script>
  <script src="main.js"></script>
</body>

</html>
```

*Note*: As you can see we include a script called **best-sqlite3-frontend.js** in our **index.html** file. That script is not present in our www folder - instead it is created by the server and gives your frontend code access to an object called **db** - so don't use *db* as one of your own variable names!


#### main.js
```js
async function start() {

  // You can run any query you want against it
  let result = await db.run(/*sql*/`
      SELECT *, UP(title) AS TitleInCaps 
      FROM albums 
      WHERE title LIKE $title
  `, { title: '%kill%' });

  // Log the result of the query
  console.table(result);

  // You can ask the db which tables and views
  // that are in it
  console.log('All db tables', await db.tables());
  console.log('All db views', await db.views());
}

start();
```

### The run method
The only really important method you will have to call is **await db.run(*query, params*)**. It is important that you don't forget **await** before *db.run*. And await statements are only allowed inside *async functions*.

The **query** argument is written in SQL, but whenever you have values you want to use in your sql you replace them with a "variable name" starting with **$**.

The **params** argument is an object with properties identical to the variable names you chose in the query, except for the dollar sign. They hold the values that will be inserted into the SQL query.

This way of working is called **prepared statements** and it reduces the risk of [sql injections](https://en.wikipedia.org/wiki/SQL_injection).

If you write a SELECT query you will get an array of objects in return, with each object corresponding to a row in the result.

If you write any other query you will get an object back telling you how many rows that query modified/changed in the database, and for INSERT queries also which was the latest id inserted.

## The tables() and views() methods
* If you write **await db.tables()** you will get a list (array of strings) with the names of all the tables in the database.
* If you write **await db.views()** you will get a list (array of strings) with the names of all the views in the database (if you have any).

*Good luck and have fun!*

