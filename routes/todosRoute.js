const express = require('express');
const TodosController = require('../controllers/todosController');
const { authentication } = require('../middlewares/authMiddleware');
const CheckImageFileController = require('../controllers/checkImageFileController');
const router = express.Router();

router.use(authentication);
router.get('/:id', TodosController.getAllTodos);
router.get('/name/:id', TodosController.getTodoByName);
router.post('/create', TodosController.create);
router.put('/edit/:id', TodosController.edit);
router.delete('/delete/:id', TodosController.delete);

router.get('/checkFile/:id', CheckImageFileController.checkFile);
router.patch('/chooseFile/:id', CheckImageFileController.chooseFile);

module.exports = router;