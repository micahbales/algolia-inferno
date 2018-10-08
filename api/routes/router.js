const utils = require('../utils/utils');
const controllers = require('../controllers/controllers');
const express = require('express');

const router = express.Router();

router.get('/api/1/apps', utils.catchErrors(controllers.getApp));
router.post('/api/1/apps', utils.catchErrors(controllers.postApp));
router.delete('/api/1/apps/:id', utils.catchErrors(controllers.deleteApp));

module.exports = router;
