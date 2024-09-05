const UserService = require("../services/userService");

class UserController {
    static async getAllUsers(req,res,next) {
        try {
            const params = req.query;
            const users = await UserService.getAllUser(params);
            res.status(200).json({
                message : 'Fetching Users is Successfully',
                data : users
            })
        } catch (err) {
            next(err);
        }
    }

    static async getUserById(req,res,next) {
        try {
            const params = req.params;
            const user = await UserService.getUserById(params);
            res.status(200).json({
                message : 'Fetching User is Successfully',
                data : user
            })

        } catch (err) {
            next(err);
        }
    }

    static async getUserByEmail(req,res,next) {
        try {
            const params = req.params;
            const user = await UserService.getUserByEmail(params);
            res.status(200).json({
                message : 'Fetching User is Successfully',
                data : user

            })

        } catch (err) {
            next(err);
            
        }
    }

    static async edit(req,res,next) {
        try {
            const params = {...req.body, ...req.params};
            const user = await UserService.edit(params);
            res.status(200).json({
                message : 'Editing User is Successfully ',
                data : user
            })
        } catch (err) {
            next(err);
        }
    }

    static async delete(req,res,next) {
        try {
            const params = {...req.params};
            const user = await UserService.delete(params);
            res.status(200).json({
                message : 'Deleting User is Successfully',
                data : user
            })

        } catch (err) {
            next(err);
        }
    }
}

module.exports = UserController;