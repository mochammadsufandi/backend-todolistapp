const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const unlinkAsync = promisify(fs.unlink);

class CheckImageFileService {

    static async checkFile(params) {
        const {id, file} = params;
        const todo = await prisma.todo.findUnique({
            where : {
                id : +id
            }
        })
        if(!todo) throw({name : 'Todo Not Found'});
        const arrayFile = todo[file];
        console.log(todo)
        const maxNumberFile = process.env.MAX_NUMBER_FILE;

        if(file === 'supportingFile') {
            if(arrayFile.length >= maxNumberFile) {
                throw({name : 'File Maximum Number'})
            } else{
                const max = maxNumberFile - arrayFile.length;
                return {arrayFile, max};
            }
        } else if(file === 'image' && arrayFile) {
            const imageLinkArray = arrayFile.split('/');
            const imageName = imageLinkArray[imageLinkArray.length-1]

            if(imageName !== 'no-image.jpg') {
                throw({name : 'File Maximum Number'})
            } else {
                const max = 1;
                return {arrayFile, max}
            }
        } else {
            throw({name : 'File Not Found'});
        }
    }

    static async chooseFile(params) {
        const {id, file, fileName} = params;
        const todo = await prisma.todo.findUnique({
            where : {
                id : +id
            }
        })
        if(!todo) throw({name : 'Todo Not Found'});

        let arrayFile = [];
        let fileChoosenIndex;
        
        let fileType;

        if(file === 'supportingFile') {
            fileType = 'files';
            arrayFile = [...todo[file]];
        } else {
            fileType = 'images';
            arrayFile.push(todo[file]);
        }

        for(const i in arrayFile) {
            if(arrayFile[i] === fileName) {
                fileChoosenIndex = i;
            }
        }
        
        if(!fileChoosenIndex) throw({name : 'File Not Found'});
        
        const name = arrayFile[fileChoosenIndex].split('/');
        const length = name.length;

        if(file === 'image' && name[length-1] === 'no-image.jpg') throw({name : 'Bad Request'});

        arrayFile.splice(fileChoosenIndex,1);
        console.log(arrayFile)

        try {
            await unlinkAsync(path.join(__dirname,`../assets/${fileType}/todos/${name[length-1]}`))
        } catch (err) {
            throw(err)
        }
        
        if(file === 'supportingFile') {
            const updatedTodo = await prisma.todo.update({
                where : {
                    id : +id
                },
                data : {
                    supportingFile : arrayFile
                }
            })
            return updatedTodo;

        } else {
            const updatedTodo = await prisma.todo.update({
                where : {
                    id : +id
                },
                data : {
                    image : 'localhost:3000/api/images/todos/no-image.jpg'
                }
            })
            return updatedTodo;
        }

    }
    
}

module.exports = CheckImageFileService;
