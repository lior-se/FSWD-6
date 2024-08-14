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


const Game = mongoose.model('Game', gameSchema,'Games');
const User = mongoose.model('User', userSchema,'Users');


app.post('/api/games', async (req, res) => {
  const game = new Game(req.body);
  try {
    await game.save();
    res.status(201).send(game);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/api/games',async(req,res)=>{
    try{
       const games = await Game.find();
       res.status(200).send(games);
    }catch (err) {
        res.status(500).send(err);
    }
});
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

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
