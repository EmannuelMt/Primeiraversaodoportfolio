const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
// const verifyToken = require('../middleware/authMiddleware'); // se quiser proteger

router.post('/', projectController.createProject);       // proteger com verifyToken
router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);
router.put('/:id', projectController.updateProject);     // proteger com verifyToken
router.delete('/:id', projectController.deleteProject);  // proteger com verifyToken

module.exports = router;
