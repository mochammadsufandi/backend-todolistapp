const ActivityCategoryService = require('../services/activityCategoryService');

class ActivityCategoryContoller {

    static async getAll(req,res,next) {
        try {
            const categories = await ActivityCategoryService.getAll();
            res.status(200).json({
                message : 'Success to fetch categories',
                data : categories
            })
        } catch (err) {
            next(err);
        }
        
    }
}

module.exports = ActivityCategoryContoller;