const {PrismaClient} = require('@prisma/client');
const { writeImageTodos, writeFileTodos } = require('../lib/writeFile');
const prisma = new PrismaClient();
const path = require('path');
const fs = require('fs');
const {promisify} = require('util');
const unlinkAsync = promisify(fs.unlink);

class TodoService {

    static async getAllTodos(params) {
        const {id} = params;
        const user = await prisma.user.findUnique({
            where : {
                id : +id
            }, 
            select : {
                Todo : true
            }
        })
        
        if(!user) throw({name : 'User Not Found'});

        const {Todo} = user;

        return Todo;
    }

    static async getTodoByName(params) {
        const {id,name} = params;
        const user = await prisma.user.findUnique({
            where : {
                id : +id
            }
        })

        if(!user) throw({name : 'User Not Found'});

        const todo = await prisma.todo.findMany({
            where : {
                userId : +id,
                name : {
                    contains : name
                }
            }
        })

        return todo;
    }

    static async create(params) {
        const {userId,name,deadlineDate,plannedWorkDate,image,supportingFile,isFinished,categoryId,activityCategoryId} = params;

        if(!userId || !name || !isFinished || !categoryId) throw({name : 'Required Field'});

        const user = await prisma.user.findUnique({
            where : {
                id : +userId
            }
        })
        if(!user) throw({name : 'User Not Found'});

        const allowedExtImage = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg', 'image/webp'];
        const allowedExtFile = 'application/pdf';
        const checkFileArray = supportingFile.every((value) => {
            return value.mimetype === allowedExtFile;
        })

        if(image && !allowedExtImage.includes(image.mimetype)) {
            throw({name : 'Invalid Input Type'});
        }

        if(supportingFile.length >= 1 && !checkFileArray) {
            throw({name : 'Invalid Input Type'});
        }

        const imageLink = image ? writeImageTodos(image) : 'no-image.jpg';
        const supportFile = writeFileTodos(supportingFile);
        const supportFileLink = supportFile.map((value) => {
            return value = `localhost:3000/api/files/todos/${value}`
        })

        const todo = await prisma.todo.create({
            data : {
                name,
                deadlineDate,
                plannedWorkDate,
                image : `localhost:3000/api/images/todos/${imageLink}`,
                supportingFile : supportFileLink,
                isFinished : Boolean(isFinished),
                categoryId : +categoryId,
                activityCategoryId : +activityCategoryId,
                userId : +userId
            }
        })

        return todo;
    }

    static async edit(params) {
        const {id}= params;
        const existingTodo = await prisma.todo.findUnique({
            where : {
                id : +id
            }
        })
        if(!existingTodo) throw({name : 'Todo Not Found'});

        const updateFieldTodo = {};
        const keys = Object.keys(existingTodo);
        for(const key of keys) {
            if(params[key] === undefined || params[key] === null) {
                updateFieldTodo[key] = existingTodo[key];
            } else {
                if(existingTodo[key] !== params[key]) {
                    updateFieldTodo[key] = params[key]
                } else {
                    updateFieldTodo[key] = existingTodo[key]
                }
            }
        }

        if(existingTodo.userId !== updateFieldTodo.userId) {
            throw({name : 'Bad Request'})
        }
        const imagePath = existingTodo.image.split('/');
        const imageName = imagePath[imagePath.length-1];
        
        if(params.image) {
            if(existingTodo.image && imageName !== 'no-image.jpg') {
                throw({name : 'Bad Request'})
            }
        }
        const maxNumberFile = process.env.MAX_NUMBER_FILE;
        if(updateFieldTodo.supportingFile.length >= maxNumberFile) {
            throw({name : 'Bad Request'})
        }
        const remainNumber = maxNumberFile - existingTodo.supportingFile.length;
        if(updateFieldTodo.supportingFile.length > remainNumber) {
            throw({name : 'Bad Request'})
        }

        const allowedExtImage = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg', 'image/webp'];
        const allowedExtFile = 'application/pdf';
        const checkFileArray = updateFieldTodo.supportingFile.every((value) => {
            return value.mimetype === allowedExtFile;
        })

        console.log(updateFieldTodo)
        if(updateFieldTodo.image && !allowedExtImage.includes(updateFieldTodo.image.mimetype)) {
            throw({name : 'Invalid Input Type'});
        }
        console.log('Masukk')

        if(updateFieldTodo.supportingFile.length >= 1 && !checkFileArray) {
            throw({name : 'Invalid Input Type'});
        }
        const imageLink = existingTodo.image !== 'localhost:3000/api/images/todos/no-image.jpg' && updateFieldTodo.image 
            ? writeImageTodos(updateFieldTodo.image) 
            : 'no-image.jpg';
        console.log(existingTodo)
        const supportFile = writeFileTodos(updateFieldTodo.supportingFile);
        const supportFileArray = supportFile.map((value) => {
            return value = `localhost:3000/api/files/todos/${value}`;
        })

        let arrayFileLink = [...existingTodo.supportingFile, ...supportFileArray];

        const todo = await prisma.todo.update({
            where : {
                id : +id
            },
            data : {
               name : updateFieldTodo.name,
               deadlineDate : updateFieldTodo.deadlineDate,
               plannedWorkDate : updateFieldTodo.plannedWorkDate,
               image : `localhost:3000/api/images/todos/${imageLink}`,
               supportingFile : arrayFileLink,
               categoryId : +updateFieldTodo.categoryId,
               activityCategoryId : +updateFieldTodo.activityCategoryId
            }
        })

        return todo;
    }

    static async delete(params) {
        const {id} = params;
        const existingTodo = await prisma.todo.findUnique({
            where : {
                id : +id
            }
        })

        if(!existingTodo) throw({name : 'Todo Not Found'});

        const imagePath = existingTodo.image.split('/');
        const imageName = imagePath[imagePath.length-1];
        if(existingTodo.image && imageName !== 'no-image.jpg') {
            await unlinkAsync(path.join(__dirname, `../assets/images/todos/${imageName}`));
        } 

        if(existingTodo.supportingFile.length > 0) {
            existingTodo.supportingFile.map(async(file) => {
                const filePath = file.split('/');
                const fileName = filePath[filePath.length-1];
                await unlinkAsync(path.join(__dirname, `../assets/files/todos/${fileName}`));
            })
        }
        const todo = await prisma.todo.delete({
            where : {
                id : +id
            }
        })

        return todo;
    }
}

module.exports = TodoService;