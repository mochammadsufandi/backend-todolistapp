const multer = require('multer');
const {multerTodo} = require('../middlewares/multer');

const uploadHandlerTodo = multer({
    storage : multerTodo,
    limits : {fileSize : 10000000}
}).fields([
    {name : 'image', maxCount : 1},
    {name : 'files', maxCount : 2}
])

module.exports = {uploadHandlerTodo};