const fs = require('fs');
const path = require('path');

const writeImageTodos = (image) => {
    const imageName = image.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(image.originalname);
    const imagePath = path.join(__dirname, '../assets/images/todos', imageName);
    fs.writeFileSync(imagePath, image.buffer);
    return imageName;
}

const writeFileTodos = (arrFile) => {
    const nameFile = [];
    arrFile.map((file) => {
        const fileName = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        const filePath = path.join(__dirname, '../assets/files/todos', fileName);
        fs.writeFileSync(filePath, file.buffer);
        nameFile.push(fileName);
    })
    return nameFile;
}


module.exports = {
    writeImageTodos,
    writeFileTodos
}