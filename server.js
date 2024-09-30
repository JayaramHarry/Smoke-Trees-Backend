// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://akulajayaram96:Harry123@user-logins.2czbbuy.mongodb.net/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Import the routes
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
