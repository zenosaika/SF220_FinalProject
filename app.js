var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("sqlite3.db");

db.serialize(function () {
  let create_user_table = `
  CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`;
  db.run(create_user_table);
});
