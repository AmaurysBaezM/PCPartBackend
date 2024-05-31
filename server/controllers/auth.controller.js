import { User } from '../models/Users.js';
import { Token } from '../models/token.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';

import {SendMail} from '../helpers/email_sender.js'

export const login = async (req, res) => {
    const { UserEmail, UserPasswords} = req.body;

    try {
        const Users = await User.findOne({   where: {
            UserEmail: UserEmail,
        }, });
          
    
      if (!Users) {
        return res.status(404).json({message: "Usuario no encontrado"});
      }

      if(!bcrypt.compareSync(UserPasswords, Users.UserHashedpassword)){
        return res.status(404).json({message: "Contraseña Incorrecta!"});

      }
      const accessToken = jwt.sign(
        {id: Users.UserID, UserName: Users.UserName, UserLastname: Users.UserLastname, isLogged: true},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '12h'}
      )

      const refreshToken = jwt.sign(
        {id: Users.UserID, UserName: Users.UserName, UserLastname: Users.UserLastname, isLogged: true},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '30d'}
      )

      await Token.destroy({   where: {
        ID_User: Users.UserID,
    }, });

   
      const NewToken = await Token.create({
          ID_User: Users.UserID,
          TokenRefresh: refreshToken,
          TokenAccess: accessToken,

       
      })

      
  

    



      Users.UserPasswords = undefined;
      Users.UserHashedpassword = undefined;
      Users.UserSalt = undefined;




      return res.json({...Users.dataValues, accessToken});


    } catch (error) {
        return res.status(500).json({ type: error.name, message: error.message })
    }
}

export const verifyToken = async (req, res) => {
    const {  accessToken} = req.headers.authorization;
    try 
    {
      
        if(!accessToken) return res.json (false);
       
        console.log(tokenData)
        accessToken =accessToken.replace('Bearer', '').trim();


        const token = await Token.findOne({   where: {
          TokenAccess: accessToken,
      }, });
      if(!token) return res.json (false);


        const tokenData = jwt.decode(token.TokenRefresh);

        const Users = await User.findOne({   where: {
          UserID: token.ID_User,
      }, });

      if(!Users)return res.json (false);

        const isValid = jwt.verify(token.TokenRefresh,  process.env.REFRESH_TOKEN_SECRET);
        if(!isValid) return res.json (false);

        return res.json(true);

        
    } catch (error) {
        return res.status(500).json({ type: error.name, message: error.message })
    }
}


export const forgotPassword = async (req, res) => {
  const { UserEmail} = req.body;

  try {
      const Users = await User.findOne({   where: {
          UserEmail: UserEmail,
      }, });
      if (!Users) {
        return res.status(404).json({ message:'Usuario con este correo no existe!' })
      }

      const otp = Math.floor(1000 + Math.random() * 9000)


      const response = await SendMail(UserEmail, 'Contraseña', `La contraseña de este correo en la aplicacion es: ${Users.UserPasswords}` );

      return res.json({message: response});
   


    
  } catch (error) {
    return res.status(500).json({ type: error.name, message: error.message })
}
}
