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
  email: String,
  password: String,
  ownedGames: [String],
  wishlist: [String],
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

app.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
