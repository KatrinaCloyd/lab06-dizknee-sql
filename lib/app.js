const express = require('express');
const cors = require('cors');
const client = require('./client.js');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const authRoutes = createAuthRoutes();

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password
app.use('/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
app.get('/api/test', (req, res) => {
  res.json({
    message: `in this proctected route, we get the user's id like so: ${req.userId}`
  });
});

app.get('/characters', async (req, res) => {
  try {
    const data = await client.query(`SELECT characters.name, 
    characters.owner_id, 
    characters.id, 
    species.name as species_type,
    characters.role, 
    characters.unique_power, 
    characters.movie, 
    characters.movie_year, 
    characters.hand_drawn, 
    characters.image, 
    characters.gif 
  from characters
  JOIN species ON characters.species_id = species.id
  ORDER BY characters.id`);

    res.json(data.rows);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.get('/species', async (req, res) => {
  try {
    const data = await client.query('SELECT * from species');

    res.json(data.rows);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.delete('/characters/:name', async (req, res) => {
  try {
    const chName = req.params.name;
    const data = await client.query('DELETE from characters WHERE name=$1 returning *', [chName]);

    res.json(data.rows[0]);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.get('/characters/:name', async (req, res) => {
  try {
    const chName = req.params.name;
    const data = await client.query(`SELECT characters.name, 
    characters.owner_id, 
    characters.id, 
    species.name as species_type,
    characters.role, 
    characters.unique_power, 
    characters.movie, 
    characters.movie_year, 
    characters.hand_drawn, 
    characters.image, 
    characters.gif 
  from characters
  JOIN species ON characters.species_id = species.id 
  WHERE characters.name=$1`, [chName]);

    res.json(data.rows[0]);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.post('/characters', async (req, res) => {
  try {
    const data = await client.query(`
    INSERT into characters (name, species_id, role, unique_power, movie, movie_year, hand_drawn, image, gif, owner_id)
    values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
    `,
      [
        req.body.name,
        req.body.species_id,
        req.body.role,
        req.body.unique_power,
        req.body.movie,
        req.body.movie_year,
        req.body.hand_drawn,
        req.body.image,
        req.body.gif,
        1
      ]);

    res.json(data.rows[0]);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.put('/characters/:id', async (req, res) => {
  const charId = req.params.id;

  try {
    const data = await client.query(`
    UPDATE characters 
    SET name = $1, species_id = $2, role = $3, unique_power = $4, movie = $5, movie_year = $6, hand_drawn = $7, image = $8, gif = $9, owner_id = $10
    WHERE id = $11
    RETURNING *
    `,
      [
        req.body.name,
        req.body.species_id,
        req.body.role,
        req.body.unique_power,
        req.body.movie,
        req.body.movie_year,
        req.body.hand_drawn,
        req.body.image,
        req.body.gif,
        1,
        charId,
      ]);

    res.json(data.rows[0]);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
