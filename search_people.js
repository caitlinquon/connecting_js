const Knex = require("knex");
const settings = require("./settings"); // settings.json
const myArgs = process.argv[2];

const knex = Knex ({
  client: 'pg',
  connection: {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
  }
});

knex.select('*').from('famous_people').where('last_name', myArgs).asCallback((err, rows) => {
 
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Searching...
    Found ${rows.length} person(s) by the name ${myArgs}:`);
    for(var i = 0; i < rows.length; i++){
      const myDate = `${rows[i].birthdate.getFullYear()}-${rows[i].birthdate.getMonth()+ 1}-${rows[i].birthdate.getDate()}`
    console.log(`- ${rows[i].id}: ${rows[i].first_name} ${rows[i].last_name}, born ${myDate}`);
    }
  });
