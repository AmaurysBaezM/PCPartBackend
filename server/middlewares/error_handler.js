import jwt from "jsonwebtoken";
import { Token } from '../models/token.js';
import 'dotenv/config';

export async function errorHandler(error, req, res, next){
  
  
    if(error.name === 'UnauthorizedError'){

        
        if(!error.message.includes('jwt expired')){
         
            return res.status(error.status).json({type: error.name, message: error.message});
        }
      
        try {

           
            const tokenHeader = req.header('Authorization');
            const accessToken = tokenHeader?.split(' ')[1];
            let token = await Token.findOne({   where: {
                TokenAccess: accessToken,
            }, });
          

            if(!token){
                return res.status(401).json({type: 'Unathorized', message: 'Este token no existe'})
            }

            const UserData = jwt.verify(token.TokenRefresh, process.env.REFRESH_TOKEN_SECRET);

            const Users = await User.findOne({   where: {
                UserID: UserData.ID_User,
            }, });

            if(!Users){
                return res.status(404).json({message: 'Usuario Invalido!'});
            }

            const newAccessToken = jwt.sign(
                {id: Users.UserID, UserName: Users.UserName, UserLastname: Users.UserLastname, isLogged: true},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '12h'}
              );
            
            req.header['authorization'] = `Bearer ${newAccessToken}`;

            token.TokenAccess = newAccessToken;
            await token.save();

            res.set('Authorization', `Bearer ${newAccessToken}`);

            return next();

            
        } catch (refreshError) {
            return res.status(error.message).json({type: error.name, message: error.message});
            
        }

    }


}