const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/Steam', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const gameSchema = new mongoose.Schema({
  title: String,
  developer: String,
  releaseDate: String,
  description: String,
  media: [String],
  cover: String,
  genres: [String],
  price: Number,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  email: String,
  phone: String,
  ownedGames: [String],
});

const shopSchema = new mongoose.Schema({
  shopname: String,
  password: String,
  name: String,
  email: String,
  phone: String,
  adress: String,
  Games: [String],
});


const Game = mongoose.model('Game', gameSchema,'Games');
const User = mongoose.model('User', userSchema,'Users');
const Shop = mongoose.model('Shop', shopSchema,'Shops');

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

//Test functions

app.post('/api/games', async (req, res) => {
  const { title, developer, releaseDate, description, media, cover, genres, price } = req.body;

  try {
    const newGame = new Game({
      title,
      developer,
      releaseDate,
      description,
      media,
      cover,
      genres,
      price,
    });

    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    console.error('Error adding game:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get a game by its ID








//added by lior
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ username: username, password: password });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/register-user', async (req, res) => {
  const { username, password, name, email, phone } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new user
    const newUser = new User({ username, password, name, email, phone, ownedGames: [] });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/register-shop', async (req, res) => {
  const { shopname, password, name, email, phone,adress } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await Shop.findOne({ shopname });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new user
    const newShop = new Shop({ shopname, password, name, email, phone, adress, Games: [] });
    await newShop.save();

    res.status(201).json(newShop);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/games/latest', async (req, res) => {
  try {
    const latestGames = await Game.find().sort({ releaseDate: -1 }).limit(6); // Adjust the limit as needed
    res.status(200).json(latestGames);
  } catch (error) {
    console.error('Error fetching latest games:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/games/:id', async (req, res) => {
  const { id } = req.params;

  // Check if the provided id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid game ID' });
  }

  try {
    const game = await Game.findById(id);

    if (game) {
      res.status(200).json(game);
    } else {
      res.status(404).json({ message: 'Game not found' });
    }
  } catch (error) {
    console.error('Error fetching game by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

