const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { verifyToken } = require("../lib/jwt");

const authentication = async(req,res,next) => {
    try {
        const accessToken = req.cookies.AccessToken;

        if(!accessToken) throw({name : 'Unauthenticated'});

        const user = verifyToken(accessToken);
        const existingUser = await prisma.user.findUnique({
            where : {
                email : user.email
            }
        })
        
        if(!existingUser) throw({name : 'User Not Found'});

        req.loggedUser = user;
        next();
        
    } catch (err) {
        next(err);
    }
}

const authorization = async(req,res,next) => {
    try {
        const loggedUser = req.loggedUser;
        if(!loggedUser) throw({name : 'Unauthenticated'});
        if(loggedUser.role.toLowerCase() !== 'admin') throw({name : 'Unauthorized'});

        next();

    } catch (err) {
        next(err);
    }
}


module.exports = {
    authentication,
    authorization
}