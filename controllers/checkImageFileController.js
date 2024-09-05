const { uploadHandlerTodo } = require("../lib/uploadImage");
const CheckImageFileService = require("../services/checkImageFileService");

class CheckImageFileController {

    static async checkFile(req,res,next) {
        try {
            const params = {
                ...req.params,
                ...req.query
            }
            const file = await CheckImageFileService.checkFile(params);
            res.status(200).json({
                message : 'Success to Fetch File',
                data : file
            })

        } catch (err) {
            next(err);
        }
    }

    static async chooseFile(req,res,next) {
        uploadHandlerTodo(req,res, async(err) => {
            if(err) {
                return next(err);
            }

            try {
                const params = {
                    ...req.params,
                    ...req.query,
                    ...req.body,
                }
                const file = await CheckImageFileService.chooseFile(params);
                res.status(200).json({
                    message : 'Success to Choose File',
                    data : file
                })
                
            } catch (err) {
                next(err)
            }

        })
            
    }

}

module.exports = CheckImageFileController;