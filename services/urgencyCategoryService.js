const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UrgencyCategoryService {

    static async getAll() {
        const categories = await prisma.category.findMany();
        return categories
    }

}

module.exports = UrgencyCategoryService;