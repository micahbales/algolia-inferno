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
    // Add new app to database
    const newApp = await App.create(req.body);
    // Update algolia index
    await algoliaApps.addObject(newApp);
    
    res.status(200).json({_id: newApp._id});
};

// DELETE /api/1/apps/:id
module.exports.deleteApp = async (req, res) => {
    const objectID = req.params.id;

    algoliaApps.getObject(objectID, async (err, content) => {
        if (err) console.error(err);
        
        // Delete record from algolia index
        await algoliaApps.deleteObject(objectID, (res) => null);

        // Delete record from database
        await App.deleteOne({_id: content._id});

        res.status(200).json({});
    });
};
