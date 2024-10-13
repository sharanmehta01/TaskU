const express = require('express');
const sequelize = require('./models').sequelize;
const dotenv = require('dotenv');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// Passport middleware for authentication
require('./config/passport')(passport); // Import passport configuration
app.use(passport.initialize()); // Initialize passport middleware

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes); // Authentication routes

// Sync database
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
