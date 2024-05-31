import { text } from 'express';
import nodemailer from 'nodemailer';
import 'dotenv/config';


export const SendMail = async(email, subject, body) => {
   return new Promise ((resolve, reject) =>{
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth:{
            user: process.env.EMAIL_ACCOUNT,
            pass : process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions ={
        from: process.env.EMAIL_ACCOUNT,
        to: email,
        subject: subject,
        text: body,
    };
    let response;

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.error('Error enviando mensaje:', error);
           reject(Error('Error enviando mensaje'));
        }
        console.log('Correo enviado', info.response);
      
      
     resolve({message: 'Codigo de reseteo de contrasena enviado a tu correo'});
     
      



    });
   });

};
