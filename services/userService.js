const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

class UserService {

    static async getAllUser(params) {
        const {page,limit} = params;
        const skip = (page-1)*limit;
        const user = await prisma.user.findMany({
            skip : skip,
            take : +limit,
            select : {
                name : true,
                email : true,
                role : true
            }
        })
        return user;
    }

    static async getUserById(params) {
        const {id} = params;
        const user = await prisma.user.findUnique({
            where : {
                id : +id
            },
            select : {
                name : true,
                email : true,
                role : true
            }
        });

        if(!user) throw({name : 'User Not Found'});

        return user;
    }

    static async getUserByEmail(params) {
        const {email} = params;
        const user = await prisma.user.findMany({
            where : {
                email : {
                    contains : email
                }
            },
            select : {
                name : true,
                email : true,
                role : true
            }
        })

        if(!user) throw({name : 'User Not Found'});

        return user;
    }

    static async edit(params) {
        const {name,id} = params;
        const existingUser = await prisma.user.findUnique({
            where : {
                id : +id
            }
        })
        if(!existingUser) throw({name : 'User Not Found'});
        const user = await prisma.user.update({
            where : {
                id : +id
            },
            data : {name},
            select : {
                name : true,
                email : true,
                role : true
            }
        })

        return user;

    }

    static async delete(params) {
        const {id} = params;
        const existingUser = await prisma.user.findUnique({
            where : {
                id : +id
            }
        })

        if(!existingUser) throw({name : 'User Not Found'});
        const user = await prisma.user.delete({
            where : {
                id : +id
            },
            select : {
                name : true,
                email : true,
                role : true
            }
        })

        return user;
    }

}

module.exports = UserService;