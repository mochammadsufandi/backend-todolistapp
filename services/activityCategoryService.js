const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ActivityCategoryService {

    static async getAll() {
        const categories = await prisma.activityCategory.findMany();
        return categories;
    }
}

module.exports = ActivityCategoryService;