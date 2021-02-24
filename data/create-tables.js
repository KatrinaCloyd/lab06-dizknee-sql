const client = require('../lib/client');
const { getEmoji } = require('../lib/emoji.js');

// async/await needs to run in a function
run();

async function run() {

  try {
    // initiate connecting to db
    await client.connect();

    // run a query to create tables
    await client.query(`
                CREATE TABLE users (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(256) NOT NULL,
                    hash VARCHAR(512) NOT NULL
                );
                CREATE TABLE species (
                  id SERIAL PRIMARY KEY,
                  name VARCHAR(512) NOT NULL
              );           
                CREATE TABLE characters (
                    id SERIAL PRIMARY KEY NOT NULL,
                    name VARCHAR(512) NOT NULL,
                    species_id INTEGER NOT NULL REFERENCES species(id),
                    role VARCHAR(512) NOT NULL,
                    unique_power VARCHAR(512) NOT NULL,
                    movie VARCHAR(512) NOT NULL,
                    movie_year INTEGER NOT NULL,
                    hand_drawn BOOLEAN NOT NULL,
                    image VARCHAR(512) NOT NULL,
                    gif VARCHAR(512) NOT NULL,
                    owner_id INTEGER NOT NULL REFERENCES users(id)
            );
        `);

    console.log('create tables complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch (err) {
    // problem? let's see the error...
    console.log(err);
  }
  finally {
    // success or failure, need to close the db connection
    client.end();
  }

}
