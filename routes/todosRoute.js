const express = require('express');
const TodosController = require('../controllers/todosController');
const { authentication } = require('../middlewares/authMiddleware');
const CheckImageFileController = require('../controllers/checkImageFileController');
const router = express.Router();

// router.use(authentication);
router.get('/:userId', TodosController.getAllTodos);
router.get('/byId/:userId/:todoId', TodosController.getTodoById);
router.get('/name/:userId', TodosController.getTodoByName);
router.post('/create', TodosController.create);
router.put('/edit/:id', TodosController.edit);
router.delete('/delete/:id', TodosController.delete);

router.get('/checkFile/:id', CheckImageFileController.checkFile);
router.patch('/chooseFile/:id', CheckImageFileController.chooseFile);

module.exports = router;