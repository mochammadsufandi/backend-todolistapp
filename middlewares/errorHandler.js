const multer = require("multer");

const errorHandler = async(err,req,res,next) => {
    console.log(err); 

    if(err instanceof multer.MulterError) {
        return res.status(409).json({message : err.message});
    }

    switch (err.name) {
        case 'Invalid Input Login' : 
           return res.status(400).json({message : 'Please Input Valid Email and Password'});
        case 'Email Not Found' :
            return res.status(401).json({message : 'Email is Not Found, please input valid email'});
        case 'Wrong Password' :
            return res.status(401).json({message : 'Password is Not Correct, please input valid password'});
        case 'Unauthenticated' :
            return res.status(401).json({message : 'You are Unauthenticated, please Login First'});
        case 'Unauthorized' :
            return res.status(401).json({message : 'You are Unauthorized, Request are not allowed'});
        case 'Invalid Input Register' : 
            return res.status(400).json({message : 'Please Input Valid Email and Password'});
        case 'Existing Email' : 
            return res.status(409).json({message : 'Email is Already Exist'});
        case 'User Not Found' : 
            return res.status(409).json({message : 'User is not found'});
        case 'Todo Not Found' : 
            return res.status(409).json({message : 'Todo is not found'});
        case 'File Not Found' : 
            return res.status(409).json({message : 'File is not found'});
        case 'File Maximum Number' : 
            return res.status(413).json({message : 'File Exceed the limit Number, please Delete the file first'});
        case 'Bad Request' :
            return res.status(405).json({message : 'Bad Request, illegal Method'});
        case 'Invalid Input Type' :
            return res.status(401).json({message : 'Invalid Input Type'});
        case 'Required Field' :
            return res.status(401).json({message : 'Please Input All Required Input'});
        default :   
            return res.status(500).json({message : 'Internal Server Error'});
    }
   
}

module.exports = errorHandler;