require('dotenv').config();
const algoliasearch = require('algoliasearch');
const algoliaClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
const chunk = require('lodash').chunk;

// Connect to our database
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.connection.on('error', (err) => {
  console.error(err.message);
});

// Import models
require('../models/App');

// Get app data from DB
const App = mongoose.model('App');
App.find().exec().then((apps) => {
    // Sync Algolia search index
    const index = algoliaClient.initIndex('apps');
    index.clearIndex(() => {
        const chunks = chunk(apps, 1000);
        const chunksArray = chunks.map((batch) => {
            return index.addObjects(batch);
        });
        Promise.all(chunksArray)
            .then(() => {
                process.exit(0);
            });
    });
});
