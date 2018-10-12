const mongoose = require('mongoose');
const App = mongoose.model('App');
const algoliasearch = require('algoliasearch');
const algoliaClient = algoliasearch(
    process.env.ALGOLIA_APP_ID, 
    process.env.ALGOLIA_ADMIN_KEY
);
const algoliaApps = algoliaClient.initIndex('apps');

// GET /api/1/apps
module.exports.getApp = async (req, res) => {
    const apps = await App.find().exec();

    res.status(200).json({apps});
};

// POST /api/1/apps
module.exports.postApp = async (req, res) => {
    const newApp = await App.create(req.body);

    res.status(200).json({_id: newApp._id});
};

// DELETE /api/1/apps/:id
module.exports.deleteApp = async (req, res) => {
    // Delete record from database
    await App.deleteOne({_id: req.params.id});
    // Remove app from algolia index
    await algoliaApps.deleteObject(req.params.id, (res) => null);
    res.status(200).json({});
};
