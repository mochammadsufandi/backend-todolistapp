const { PrismaClient } = require("@prisma/client");
const { comparePassword, hashPassword } = require("../lib/bcrypt");
const { generateToken } = require("../lib/jwt");
const prisma = new PrismaClient();

class AuthService {

    static async login(params) {
        const {email, password} = params;

        if(!email || !password) throw({name : 'Invalid Input Login'});

        const user = await prisma.user.findUnique({
            where : {email}
        })
        
        if(!user) throw({name : 'Email Not Found'});

        const checkPassword = comparePassword(password,user.password);

        if(!checkPassword) {
            if(user.password !== password) throw({name : 'Wrong Password'});
        }

        const token = generateToken({
            id : user.id,
            name : user.name,
            email : user.email,
            role : user.role,
        })

        return token
    }

    static async register(params) {
        const {name,email,password,role} = params;

        if(!name || !email || !password || !role) throw({name : 'Invalid Input Register'});

        const existingUser = await prisma.user.findUnique({
            where : {email}
        })

        if(existingUser) throw({name : 'Existing Email'});

        const hashedPassword = hashPassword(password);

        const user = await prisma.user.create({
            data : {
                name, email,
                password : hashedPassword,
                role
            }
        })

        return {
            name : user.name,
            email : user.email,
            role : user.role
        };

    }
}

module.exports = AuthService;