const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projec.controller.js')
// GET /projects
router.get('/projects', projectController.getAllProjects);

// POST /projects
router.post('/projects', projectController.createProject);

// GET /projects/:id
router.get('/projects/:id', projectController.getProjectById);

router.get('/projects/by:userId', projectController.getProjectByUser);
// PUT /projects/:id
router.put('/projects/:id', projectController.updateProject);

// DELETE /projects/:id
router.delete('/projects/:id', projectController.deleteProject);

module.exports = router;

