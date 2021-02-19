const client = require('../lib/client');
// import our seed data:
const { characters } = require('./characters.js');
const usersData = require('./users.js');
const { getEmoji } = require('../lib/emoji.js');

run();

async function run() {

  try {
    await client.connect();

    const users = await Promise.all(
      usersData.map(user => {
        return client.query(`
                      INSERT INTO users (email, hash)
                      VALUES ($1, $2)
                      RETURNING *;
                  `,
          [user.email, user.hash]);
      })
    );

    const user = users[0].rows[0];

    await Promise.all(
      characters.map(char => {
        return client.query(`
                    INSERT INTO characters (name, species, role, unique_power, movie, movie_year, hand_drawn, image, gif, owner_id)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
                `,
          [char.name, char.species, char.role, char.unique_power, char.movie, char.movie_year, char.hand_drawn, char.image, char.gif, user.id]);
      })
    );


    console.log('seed data load complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch (err) {
    console.log(err);
  }
  finally {
    client.end();
  }

}
