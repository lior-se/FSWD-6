const [count, setCount] = useState(0)
const addUser = async (user) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users', user);
    console.log('User added:', response.data);
  } catch (error) {
    console.error('There was an error adding the user:', error);
  }
};

const addGame = async (game) => {
  try {
    const response = await axios.post('http://localhost:5000/api/games', game);
    console.log('Game added:', response.data);
  } catch (error) {
    console.error('There was an error adding the game:', error);
  }
};


const newUser = {
  username: 'jane_doe',
  email: 'jane@example.com',
  password: 'hashed_password',
  ownedGames: [],
  wishlist: []
};

const newGame = {
  title: 'Portal 2',
  developer: 'Valve',
  releaseDate: '2011-04-19',
  genres: ['Puzzle', 'Adventure'],
  price: 19.99
};

const fetchGames = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/games');
    console.log(response.data);
  } catch (error) {
    console.error('There was an error fetching the games:', error);
  }
};

addUser(newUser);
addGame(newGame);
fetchGames();