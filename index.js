require('dotenv').config();

// Connect to our database
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.connection.on('error', (err) => {
  console.error(err.message);
});

// Import models
require('./models/App');

// Run API
const app = require('./app');

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
    console.log(`Express is now running on port ${process.env.PORT}`);
});
