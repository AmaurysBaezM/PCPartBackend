import app from "./app.js";
import { sequelize } from "./database/database.js";
import './models/Users.js';
import './models/Category.js'


const env = process.env;

const Port = parseInt(env.PORT) || 3000;


async function main(){
 try {
  await sequelize.sync();
  console.log("Connection has been established successfully")
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  
  app.listen(port, () => {
    console.log("Server is Listening on Port", Port )
  })
  
 } catch (error) {
  console.error("Unable to connect to the database:", error)
 }


}


main ();
