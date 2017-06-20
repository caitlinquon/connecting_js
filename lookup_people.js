const pg = require("pg");
const settings = require("./settings"); // settings.json
const myArgs = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE last_name = $1 OR first_name = $1", [myArgs], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Searching...
    Found ${result.rows.length} person(s) by the name ${myArgs}:`);
    for(var i = 0; i < result.rows.length; i++){
      const myDate = `${result.rows[i].birthdate.getFullYear()}-${result.rows[i].birthdate.getMonth()+ 1}-${result.rows[i].birthdate.getDate()}`
    console.log(`- ${result.rows[i].id}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born ${myDate}`);
    }
    client.end();
  });
});