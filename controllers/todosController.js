const { uploadHandlerTodo } = require("../lib/uploadImage");

const TodoService = require("../services/todoService");

class TodosController {

    static async getAllTodos(req,res,next) {
        try {
            const params = {...req.params};
            const todos = await TodoService.getAllTodos(params);
            res.status(200).json({
                message : 'Todos is Successfully Fetched',
                data : todos
            })

        } catch (err) {
            next(err);
        }    
    }

    static async getTodoByName(req,res,next) {
        try {
            const params = {...req.params, ...req.query};
            const todo = await TodoService.getTodoByName(params);
            res.status(200).json({
                message : 'Todo is successfully Fetched',
                data : todo
            })

        } catch (err) {
            next(err);
        }
    }

    static async getTodoById(req,res,next) {
        try {
            const params = {
                ...req.params,
            }
            const todo = await TodoService.getTodoById(params);
            res.status(200).json({
                message : 'Todo is successfully Fetched',
                data : todo
            })

        } catch (err) {
            next(err);
        }
    }

    static async create(req,res,next) {
            uploadHandlerTodo(req,res, async(err) => {
                if(err) {
                    return next(err);
                }

                try {
                    const params = {
                        ...req.body,
                        image : req.files['image'] ? req.files['image'][0] : null,
                        supportingFile : req.files['files'] ? req.files['files'] : []
                    };
                    const todo = await TodoService.create(params);

                    res.status(201).json({
                        message : 'Todo is successfully created',
                        data : todo
                    })
                    
                } catch (err) {
                    next(err)
                }

            })

            
    }

    static async edit(req,res,next) {
        uploadHandlerTodo(req,res, async(err) => {
            if(err) {
                return next(err);
            }

            try {
                const params = {
                    ...req.body, 
                    ...req.params,
                    image : req.files['image'] ? req.files['image'][0] : null,
                    supportingFile : req.files['files'] ? req.files['files'] : []
                };
                const todo = await TodoService.edit(params);

                res.status(201).json({
                    message : 'Todo is successfully edited',
                    data : todo
                })
                
            } catch (err) {
                next(err);
            }

        })
    }

    static async delete(req,res,next) {
        try {
            const params = {...req.params};
            const todo = await TodoService.delete(params);
            res.status(201).json({
                message : 'Todo is successfully deleted'
            })

        } catch (err) {
            next(err);
        }
        
    }

}

module.exports = TodosController;