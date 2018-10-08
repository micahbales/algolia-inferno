const mongoose = require('mongoose');
const App = mongoose.model('App');

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
    const deletedApp = await App.deleteOne(req.body);

    res.status(200).json({});
};
