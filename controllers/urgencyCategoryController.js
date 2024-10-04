const UrgencyCategoryService = require("../services/urgencyCategoryService");

class UrgencyCategoryController {

    static async getAll (req,res,next) {
        try {
            const categories = await UrgencyCategoryService.getAll();
            res.status(200).json({
                messsage : 'Success to fetch categories',
                data : categories
            })
        } catch(err) {
            next(err);
        }

    }
}

module.exports = UrgencyCategoryController;