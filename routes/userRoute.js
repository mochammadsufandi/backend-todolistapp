const express = require('express');
const UserController = require('../controllers/userController');
const { authorization, authentication } = require('../middlewares/authMiddleware');
const router = express.Router();

router.put('/:id', UserController.edit);

router.use(authentication);
router.use(authorization);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.get('/email/:email', UserController.getUserByEmail);
router.delete('/:id', UserController.delete);

module.exports = router;