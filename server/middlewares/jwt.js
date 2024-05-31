import { expressjwt } from "express-jwt";
import { Token } from '../models/token.js';
import 'dotenv/config'



export function authJwt(){

  
    try {
        return expressjwt({
            secret: process.env.ACCESS_TOKEN_SECRET,
            algorithms: ['HS256'],
            isRevoked: isRevoked,
    
        }).unless({
            path:[
                `${process.env.API_URL}/login`,
                `${process.env.API_URL}/login/`,
    
                 `${process.env.API_URL}/user`,
                 `${process.env.API_URL}/user/`,
    
                `${process.env.API_URL}/verifyToken`,
                `${process.env.API_URL}/verifyToken/`,
                
                `${process.env.API_URL}/forgotPassword`,
                `${process.env.API_URL}/forgotPassword/`,
    
            ]
        });
    } catch (error) {
    
        console.log(error);
    }
    
}

async function isRevoked(req, jwt){
    try {
     
        const authHeader = req.header('Authorization');
       
        if(!authHeader){
            return false;
        }
      
        if(!authHeader.startsWith('Bearer')){
            return true;
        }
    
        const accessToken = authHeader.replace('Bearer', '').trim();
    
        const token = await Token.findOne({   where: {
            TokenAccess: accessToken,
        }, });
    
        if(!token){
            return false;
        }
    
        
    
        return !token ; 
    } catch (error) {
        console.log(error);
    }








}