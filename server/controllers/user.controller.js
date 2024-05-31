import { User } from '../models/Users.js'
import bcrypt from "bcrypt";
import 'dotenv/config'
import {validationResult} from 'express-validator';





export const getUsers = async (req, res) => {
    try {
        const Users = await User.findAll()
        res.json(Users)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        
        const Users = await User.findOne({   where: {
            UserID: id,
        }, });
          
    
      if (!Users) {
        return res.status(404).json({message: "Usuario no existe"});
      }

        res.json(Users)

    } catch (error) {
        return res.status(500).json({ message: error.message }) 
    }
    




}

export const createUser = async (req, res) => {
    const { UserName, UserLastname, UserEmail, UserPasswords, UserPhone } = req.body;
    const salt = bcrypt.genSaltSync( parseInt(process.env.SALTROUNDS));
    const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);
    const errors = validationResult (req);
    if(!errors.isEmpty()){
        const errormessages = errors.array().map((error) =>({
            field: error.path,
            message: error.msg,
        }) );
        return res.status(400).json({errors: errormessages});
    }

    try {
        const NewUser = await User.create({
            UserName: UserName,
            UserLastname: UserLastname,
            UserEmail: UserEmail,
            UserPasswords: UserPasswords,
            UserSalt: salt,
            UserHashedpassword: bcrypt.hashSync(UserPasswords, salt),
            UserPhone: UserPhone,
            UserCreatedAt: hoy.toISOString(),
            UserUpdatedAt: hoy.toISOString()

        })

        return res.status(201).json(NewUser);
    } catch (error) {
        return res.status(500).json({ type: error.name, message: error.message })
    }

}


export const updateUser = async (req, res) => {

    try {
        const { id } = req.params;
        const { UserName, UserLastname, UserEmail, UserPasswords, UserPhone, UserUpdatedAt } = req.body

        const Users = await User.findByPk(id)
        Users.UserName = UserName;
        Users.UserLastname = UserLastname;
        Users.UserEmail = UserEmail;
        Users.UserPasswords = UserPasswords;
        Users.UserSalt = 123;
        Users.UserHashedpassword = UserPasswords + 123;
        Users.UserPhone = UserPhone;
        Users.UserUpdatedAt = hoy.toISOString();
        await Users.save();

        res.json(Users);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.destroy({
            where: {
                UserID: id,
            },


        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }


}