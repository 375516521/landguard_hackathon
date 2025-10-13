const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/marketController');

router.post('/projects', auth, ctrl.createProject);
router.get('/projects', ctrl.listProjects);
router.get('/projects/:id', ctrl.getProject);

module.exports = router;
router.get('/my-projects', auth, ctrl.getMyProjects);
router.post('/projects/:id/fund', auth, ctrl.fundProject);
router.post('/projects/:id/close', auth, ctrl.closeProject);

module.exports = router;