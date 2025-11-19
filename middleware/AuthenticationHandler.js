import jwt from 'jsonwebtoken';
import getuser from "../models/UserModel.js";

const  checkToken = async (req, res, next) => {
    const authorization = req.headers;
    if(!authorization){
          res.status(401).json({
            success: false, 
            message: 'Access Denied. You do not have permission to access the app'});
    }
    const token = authorization.split(' ')[1];

    try
    {
        const {id}= jwt.verify(token, process.env.SECRET);
       const[user]= await getuser.getUser(id);
       req.user = user[0].id;
         next();
    }   catch (error){  
        res.status(401).json({
            success: false,
            messsage: [
                {result: "Request is unathorized"},
            ]
})
}
}