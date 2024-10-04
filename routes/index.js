const express = require('express');
const path = require('path');
const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const todosRoute = require('./todosRoute');
const categoryRoute = require('./categoryRoute');
const { authentication } = require('../middlewares/authMiddleware');

const router = express.Router();


router.use(authRoute);
router.use('/images/todos', authentication,
    express.static(path.join(__dirname, '../assets/images/todos'))
)
router.use('/files/todos', authentication,
    express.static(path.join(__dirname, '../assets/files/todos'))
)
router.use('/user',userRoute);
router.use('/todos',todosRoute);
router.use('/categories',categoryRoute)

module.exports = router;