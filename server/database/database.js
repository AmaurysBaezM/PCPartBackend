import Sequelize  from "sequelize";
import 'dotenv/config'

const env = process.env;

const Port = parseInt(env.DB_PORT);
const Host = env.DB_HOST
const DBName = env.DB_NAME
const DBUser = env.DB_USER
const DBPassword = env.DB_PASSWORD
const DBDialect = env.DB_DIALECT




export const sequelize = new Sequelize(DBName,DBUser, DBPassword, {
host: Host,
dialect: DBDialect,
port: Port,
sslmode: true,
dialectOptions:{
ssl:{
    require:true
}

}


 })