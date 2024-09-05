const AuthService = require("../services/authService");

class AuthController {
    static async login(req,res,next) {
        try {
            const params = req.body;
            const user = await AuthService.login(params);
            res.cookie("AccessToken", user, {
                httpOnly : true,
                secure : process.env.SECRET_KEY,
                maxAge : 3600000
            })
            res.status(200).json({
                message : 'Login Successfully',
                data : user
            })

        } catch (err) {
            next(err);
        }
    }

    static async register(req,res,next) {
        try {
            const params = req.body;
            const user = await AuthService.register(params);
            res.status(200).json({
                message : 'Register Successfully',
                data : user
            })

        } catch (err) {
            next(err);
        }
    }
}

module.exports = AuthController;