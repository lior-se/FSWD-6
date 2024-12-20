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
  address: String,
  Games: [String],
});


const Game = mongoose.model('Game', gameSchema,'Games');
const User = mongoose.model('User', userSchema,'Users');
const Shop = mongoose.model('Shop', shopSchema,'Shops');

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});


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









//added by lior
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    let user = await User.findOne({ username: username, password: password });
    if (user) {
      return res.status(200).json(user);
    }

    let shop = await Shop.findOne({ shopname: username, password: password });
    if (shop) {
      return res.status(200).json(shop);
    }

    res.status(401).json({ message: 'Invalid username or password' });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/api/register-user', async (req, res) => {
  const { username, password, name, email, phone } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    const existingShop = await Shop.findOne({ shopname: username });
    if (existingUser || existingShop) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = new User({ username, password, name, email, phone, ownedGames: [] });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/register-shop', async (req, res) => {
  const { shopname, password, name, email, phone,address } = req.body;

  try {
    const existingShop = await Shop.findOne({ shopname });
    const existingUser = await User.findOne({ username: shopname });
    if (existingUser || existingShop) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newShop = new Shop({ shopname, password, name, email, phone, address, Games: [] });
    await newShop.save();

    res.status(201).json(newShop);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/games', async (req, res) => {
  try {
    const allGames = await Game.find().sort({ releaseDate: -1 });
    res.status(200).json(allGames);
  } catch (error) {
    console.error('Error fetching all games:', error);
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


app.put('/api/games/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid game ID' });
  }

  try {
    const updatedGame = await Game.findByIdAndUpdate(id, updateData, { new: true });

    if (updatedGame) {
      res.status(200).json(updatedGame);
    } else {
      res.status(404).json({ message: 'Game not found' });
    }
  } catch (error) {
    console.error('Error updating game:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/*
app.put('/api/users/:username', async (req, res) => {
  const { username } = req.params;
  const { name, email, phone, password } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { name, email, phone, password },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Internal Server Error');
  }
});

*/


//
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, name, email, phone, password, ownedGames } = req.body;
  console.log('in the box');
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, name, email, phone, password, ownedGames },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Internal Server Error');
  }
});



app.put('/api/shops/:id', async (req, res) => {
  const { id } = req.params;
  const { shopname, name, email, phone, adress, password, Games } = req.body;

  try {
    const updatedShop = await Shop.findByIdAndUpdate(
      id,
      { shopname, name, email, phone, adress, password, Games },
      { new: true }
    );
    if (!updatedShop) {
      return res.status(404).send('Shop not found');
    }
    res.json(updatedShop);
  } catch (error) {
    console.error('Error updating shop:', error);
    res.status(500).send('Internal Server Error');
  }
});





/*

app.put('/api/shops/:shopname', async (req, res) => {
  const { shopname } = req.params;
  const { name, email, phone, address, password } = req.body;

  try {
    const updatedShop = await Shop.findOneAndUpdate(
      { shopname: shopname },
      { name, email, phone, address, password },
      { new: true }
    );
    if (!updatedShop) {
      return res.status(404).send('Shop not found');
    }
    res.json(updatedShop);
  } catch (error) {
    console.error('Error updating shop:', error);
    res.status(500).send('Internal Server Error');
  }
});

*/

app.put('/api/shop/add-game/:shopId', async (req, res) => {
  const { shopId } = req.params;
  const { gameId } = req.body;
  console.log("gameID: %s",gameId);
  console.log("shopID: %s",shopId);
  if (!mongoose.Types.ObjectId.isValid(shopId)) {
    return res.status(400).json({ message: 'Invalid shop ID' });
  }

  try {
    const shop = await Shop.findByIdAndUpdate(
      shopId,
      { $push: { Games: gameId } },
      { new: true } 
    );

    if (shop) {
      res.status(200).json(shop);
    } else {
      res.status(404).json({ message: 'Shop not found' });
    }
  } catch (error) {
    console.error('Error updating shop:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
