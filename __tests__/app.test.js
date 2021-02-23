require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  describe('routes', () => {
    let token;

    beforeAll(async done => {
      execSync('npm run setup-db');

      client.connect();

      const signInData = await fakeRequest(app)
        .post('/auth/signup')
        .send({
          email: 'jon@user.com',
          password: '1234'
        });

      token = signInData.body.token; // eslint-disable-line

      return done();
    });

    afterAll(done => {
      return client.end(done);
    });

    test('returns all characters', async () => {

      const expectation = [
        {
          name: 'Ariel',
          owner_id: 1,
          id: 1,
          species: 'mythical being',
          role: 'hero',
          unique_power: 'enchanting singing voice',
          movie: 'The Little Mermaid',
          movie_year: 1989,
          hand_drawn: true,
          image: 'https://lumiere-a.akamaihd.net/v1/images/b_disneyprincess_updates_mobile_ariel_19273_ca84d9d1.jpeg?region=0,0,640,709',
          gif: 'https://www.readunwritten.com/wp-content/uploads/ariel-gif.gif'
        },
        {
          name: 'Yzma',
          owner_id: 1,
          id: 2,
          species: 'human',
          role: 'villan',
          unique_power: 'making potions',
          movie: 'The Emperor\'s New Groove',
          movie_year: 2000,
          hand_drawn: true,
          image: 'https://static.wikia.nocookie.net/empeorsneworld/images/4/41/Groove01.jpg',
          gif: 'https://media.tenor.com/images/519ee2db89b1c76456792e265536d24f/tenor.gif'
        },
        {
          name: 'Meeko',
          owner_id: 1,
          id: 3,
          species: 'animal',
          role: 'sidekick',
          unique_power: 'eating',
          movie: 'Pocahontas',
          movie_year: 1995,
          hand_drawn: true,
          image: 'https://ohmy.disney.com/wp-content/uploads/2014/11/Meeko-eats-cookies.jpg',
          gif: 'https://thumbs.gfycat.com/BlushingMilkyFoxterrier-size_restricted.gif'
        },
        {
          name: 'The Mad Hatter',
          owner_id: 1,
          id: 4,
          species: 'human',
          role: 'sidekick',
          unique_power: 'delusionally happy',
          movie: 'Alice In Wonderland',
          movie_year: 1951,
          hand_drawn: true,
          image: 'https://mickeyblog.com/wp-content/uploads/2018/10/Mad-Hatter-1.jpg',
          gif: 'https://64.media.tumblr.com/7c20fbed44b13af579965d11b72a93cb/e99b7c17c19de513-6c/s640x960/74aa5d7ca93dda472ac677a2745133476470b1f6.gif'
        },
        {
          name: 'Flounder',
          owner_id: 1,
          id: 5,
          species: 'talking animal',
          role: 'sidekick',
          unique_power: 'being a fish and a wet blanket at the same time',
          movie: 'The Little Mermaid',
          movie_year: 1989,
          hand_drawn: true,
          image: 'https://i.pinimg.com/originals/fe/fd/f4/fefdf4ea1b031541928c2df5fee74e5d.jpg',
          gif: 'https://thumbs.gfycat.com/CheeryFluidClingfish-size_restricted.gif'
        },
        {
          name: 'Judy Hopps',
          owner_id: 1,
          id: 6,
          species: 'talking animal',
          role: 'hero',
          unique_power: 'super hops',
          movie: 'Zootopia',
          movie_year: 2016,
          hand_drawn: false,
          image: 'https://static.wikia.nocookie.net/disney/images/d/da/Profile_-_Judy_Hopps.jpeg',
          gif: 'https://media.tenor.com/images/706d4159ab2f186d179bfa18dd32080f/tenor.gif'
        },
        {
          name: 'Ursula',
          owner_id: 1,
          id: 7,
          species: 'mythical being',
          role: 'villan',
          unique_power: 'sea magic and binding contracts',
          movie: 'The Little Mermaid',
          movie_year: 1989,
          hand_drawn: true,
          image: 'https://data.junkee.com/wp-content/uploads/2019/06/ursula-resized.jpg',
          gif: 'https://i.imgur.com/3sTt25z.gif'
        },
        {
          name: 'Snow White',
          owner_id: 1,
          id: 8,
          species: 'human',
          role: 'hero',
          unique_power: 'seeing the good in ANYONE',
          movie: 'Snow White and the Seven Dwarfs',
          movie_year: 1938,
          hand_drawn: true,
          image: 'https://i2-prod.mirror.co.uk/incoming/article12479954.ece/ALTERNATES/s615/0_Snow-White-and-the-Seven-Dwarfs.jpg',
          gif: 'https://thumbs.gfycat.com/AdoredAgitatedAnkole-small.gif'
        },
        {
          name: 'Evil Queen',
          owner_id: 1,
          id: 9,
          species: 'human',
          role: 'villan',
          unique_power: 'evil magic and an all knowing mirror',
          movie: 'Snow White and the Seven Dwarfs',
          movie_year: 1938,
          hand_drawn: true,
          image: 'https://fangirlish.com/wp-content/uploads/2020/04/The-Evil-Queen.jpg',
          gif: 'https://i.pinimg.com/originals/0f/47/f8/0f47f8e27714ad84e087bbfd3ec5e45e.gif'
        },
        {
          name: 'Pocahontas',
          owner_id: 1,
          id: 10,
          species: 'human',
          role: 'hero',
          unique_power: 'can paint with the colors of the wind',
          movie: 'Pocahontas',
          movie_year: 1995,
          hand_drawn: true,
          image: 'https://bluestockingorg.files.wordpress.com/2017/08/pocahontas1.jpg?w=636',
          gif: 'https://media0.giphy.com/media/26tn2Zkhrg5Ja67fO/giphy.gif'
        },
        {
          name: 'Nakoma',
          owner_id: 1,
          id: 11,
          species: 'human',
          role: 'sidekick',
          unique_power: 'dissapproving and encouraging at the same time',
          movie: 'Pocahontas',
          movie_year: 1995,
          hand_drawn: true,
          image: 'http://images2.fanpop.com/image/polls/285000/285722_1277148162269_full.jpg',
          gif: 'https://i.pinimg.com/originals/f1/2b/62/f12b62979660b9daabac55ee16abd056.gif'
        },
        {
          name: 'Maleficent',
          owner_id: 1,
          id: 12,
          species: 'mythical being',
          role: 'villan',
          unique_power: 'curses and dragon form',
          movie: 'Sleeping Beauty',
          movie_year: 1959,
          hand_drawn: true,
          image: 'https://i.pinimg.com/originals/40/fc/aa/40fcaa34e1d98ebb4c9afa1ba0f1a772.png',
          gif: 'https://i.pinimg.com/originals/c2/ca/5b/c2ca5ba29bb47984ed28948850ed6d49.gif'
        },
        {
          name: 'Merida',
          owner_id: 1,
          id: 13,
          species: 'human',
          role: 'hero',
          unique_power: 'fearlessness',
          movie: 'Brave',
          movie_year: 2012,
          hand_drawn: false,
          image: 'https://i.ytimg.com/vi/IXBAOu0rXWA/maxresdefault.jpg',
          gif: 'https://i.pinimg.com/originals/f3/df/42/f3df42379b731f6783f97e9df93ac6b6.gif'
        },
        {
          name: 'Diablo',
          owner_id: 1,
          id: 14,
          species: 'animal',
          role: 'henchman',
          unique_power: 'spying',
          movie: 'Sleeping Beauty',
          movie_year: 1959,
          hand_drawn: true,
          image: 'https://iv1.lisimg.com/image/15141642/243full.jpg',
          gif: 'https://24.media.tumblr.com/fb3834fec33cc35049567b3920b4bd7f/tumblr_n594xaQp811s2wio8o1_500.gif'
        },
        {
          name: 'Belle',
          owner_id: 1,
          id: 15,
          species: 'human',
          role: 'hero',
          unique_power: 'obliviousness when reading',
          movie: 'Beauty and the Beast',
          movie_year: 1991,
          hand_drawn: true,
          image: 'https://i.insider.com/58c806265476aa24008b45bc?width=600&format=jpeg',
          gif: 'https://i.kym-cdn.com/photos/images/original/000/661/412/1d2.gif'
        },
        {
          name: 'Shenzi, Banzai, and Ed',
          owner_id: 1,
          id: 16,
          species: 'talking animal',
          role: 'henchman',
          unique_power: 'eating raw meat',
          movie: 'The Lion King',
          movie_year: 1994,
          hand_drawn: true,
          image: 'https://i.pinimg.com/originals/e8/71/47/e87147340be0b9de9b29109636d50355.jpg',
          gif: 'https://i.pinimg.com/originals/07/4e/55/074e55363a1ecbe24e5f703f24204da3.gif'
        },
        {
          name: 'Tinkerbell',
          owner_id: 1,
          id: 17,
          species: 'magical being',
          role: 'sidekick',
          unique_power: 'speaking in jingles',
          movie: 'Peter Pan',
          movie_year: 1953,
          hand_drawn: true,
          image: 'http://4.bp.blogspot.com/-opX4TCEwV5w/TtB3Rkudr7I/AAAAAAAAE_U/KQl8kJX0a3g/s1600/peter+pan+tinkerbell+mad.jpg',
          gif: 'https://64.media.tumblr.com/tumblr_lxxcj5JcAy1qhigt0o1_500.gif'
        },
        {
          name: 'Kronk',
          owner_id: 1,
          id: 18,
          species: 'human',
          role: 'sidekick',
          unique_power: 'speaking squirrel',
          movie: 'The Emperor\'s New Groove',
          movie_year: 2000,
          hand_drawn: true,
          image: 'https://ohmy.disney.com/wp-content/uploads/2015/01/lovable-misfits-kronk-728x485-345597596652.jpg',
          gif: 'https://i.pinimg.com/originals/be/14/be/be14bef267e4d2784f98c202fcd8ffcc.gif'
        },
        {
          name: 'Pascal',
          owner_id: 1,
          id: 19,
          species: 'animal',
          role: 'sidekick',
          unique_power: 'changing color',
          movie: 'Tangled',
          movie_year: 2010,
          hand_drawn: false,
          image: 'https://ohmy.disney.com/wp-content/uploads/2013/09/Screen-Shot-2013-09-10-at-4.05.53-PM.png',
          gif: 'https://i.pinimg.com/originals/06/7b/ba/067bbaaf4406a14a5d2df7fac7b0c4b0.gif'
        },
      ];

      const data = await fakeRequest(app)
        .get('/characters')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });

    test('returns a single character with given name', async () => {

      const expectation =
      {
        name: 'Ariel',
        owner_id: 1,
        id: 1,
        species: 'mythical being',
        role: 'hero',
        unique_power: 'enchanting singing voice',
        movie: 'The Little Mermaid',
        movie_year: 1989,
        hand_drawn: true,
        image: 'https://lumiere-a.akamaihd.net/v1/images/b_disneyprincess_updates_mobile_ariel_19273_ca84d9d1.jpeg?region=0,0,640,709',
        gif: 'https://www.readunwritten.com/wp-content/uploads/ariel-gif.gif'
      };

      const data = await fakeRequest(app)
        .get('/characters/Ariel')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });

    test('adds new character to list of characters', async () => {

      const newEntry =
      {
        name: 'Vanessa',
        species: 'mythical being',
        role: 'villan',
        unique_power: 'getting someone to marry her in less than 2 hours',
        movie: 'The Little Mermaid',
        movie_year: 1989,
        hand_drawn: true,
        image: 'https://static.wikia.nocookie.net/littlemermaid/images/7/7b/Vanessa_1_%28film%29.jpg',
        gif: 'https://lh3.googleusercontent.com/proxy/NLvSpw1X4R2-1SbPryFRlGI5HN_RcBm4pL-PPaSKni1Kczem4TqV-lziKUS_4iVLELVCtbrvvT2oujmqMZEV1-LzgPNAXBInid_ziwCTJv-__8yyb2gkCQ'
      };

      const expectation =
      {
        ...newEntry,
        id: 20,
        owner_id: 1
      };

      const data = await fakeRequest(app)
        .post('/characters')
        .send(newEntry)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);

      const allChar = await fakeRequest(app)
        .get('/characters')
        .expect('Content-Type', /json/)
        .expect(200);

      const vanessa = allChar.body.find(char => char.name === 'Vanessa');

      expect(vanessa).toEqual(expectation);
    });

    test('removes a single character with given name', async () => {

      const expectation =
      {
        name: 'Ariel',
        owner_id: 1,
        id: 1,
        species: 'mythical being',
        role: 'hero',
        unique_power: 'enchanting singing voice',
        movie: 'The Little Mermaid',
        movie_year: 1989,
        hand_drawn: true,
        image: 'https://lumiere-a.akamaihd.net/v1/images/b_disneyprincess_updates_mobile_ariel_19273_ca84d9d1.jpeg?region=0,0,640,709',
        gif: 'https://www.readunwritten.com/wp-content/uploads/ariel-gif.gif'
      };

      const data = await fakeRequest(app)
        .delete('/characters/Ariel')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);

      const noItem = await fakeRequest(app)
        .get('/characters/Ariel')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(noItem.body).toEqual('');
    });

    test('updates charactr in data set by id', async () => {

      const charUpdate =
      {
        name: 'Vanessa',
        owner_id: 1,
        species: 'mythical being',
        role: 'villan',
        unique_power: 'enchanting singing voice',
        movie: 'The Little Mermaid',
        movie_year: 1989,
        hand_drawn: true,
        image: 'none',
        gif: 'none here either'
      };

      const expectation =
      {
        ...charUpdate,
        id: 20
      };

      const data = await fakeRequest(app)
        .put('/characters/20')
        .send(charUpdate)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);

      const updatedData = await fakeRequest(app)
        .get('/characters/Vanessa')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(updatedData.body).toEqual(expectation);

    });

  });
});
