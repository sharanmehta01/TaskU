const express = require('express');
const sequelize = require('./models').sequelize;
const app = express();
const dotenv = require('dotenv');

dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sync database
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
