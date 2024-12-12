# 🎮 GameShop Full-Stack Project

**GameShop** is the sixth and final project of the FullStack yearly course, completed in the last year of studies. It is a web-based application that emulates a game shop. The platform provides features for shops to log in and manage their game catalog and for users to browse, buy games, and manage their personal game library.

---

## 🛠 Features

### For Users
- 📝 **User Registration and Login:** Create an account and log in to access a personalized game library.
- 🔍 **Browse Games:** View available games with details such as title, developer, release date, genres, and price.
- 🛒 **Purchase Games:** Add games to their library after purchase.
- 📚 **Game Library:** Manage and review owned games.

### For Shops
- 📝 **Shop Registration and Login:** Shops can create an account and log in.
- ➕ **Add Games:** Add new games to the shop's inventory with metadata like title, description, and price.
- 🗂 **Manage Games:** Update the shop's game catalog as needed.

---

## 💻 Tech Stack

**Frontend:**
- React
- React Router for routing
- Axios for HTTP requests

**Backend:**
- Express.js for server-side logic
- MongoDB for database
- Mongoose for object data modeling (ODM)

**Additional Tools:**
- CORS for API request handling
- Node.js for runtime

---

## 📂 Project Structure

### Frontend
- `App.js`: The main React component handling routes.
- **Components:**
  - `Home`: Landing page for the application.
  - `Login`: User and shop login page.
  - `RegisterUser` and `RegisterShop`: Registration pages for users and shops.
  - `UserApp` and `ShopApp`: Dashboards for users and shops, respectively.

### Backend
- **API Endpoints:**
  - `/api/register-user` and `/api/register-shop`: Register new users or shops.
  - `/api/login`: Log in for both users and shops.
  - `/api/games`: Manage games (add, update, fetch).
- **Schemas:**
  - `Game`: Contains game details like title, genres, and price.
  - `User`: Stores user data and owned games.
  - `Shop`: Stores shop information and their game inventory.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v16 or later)
- **MongoDB**
