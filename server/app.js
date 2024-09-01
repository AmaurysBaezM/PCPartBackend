import express from "express";
import UsersRoutes from "./routes/User.routes.js"
import CategoryRoutes from "./routes/Category.routes.js"
import AtributeRoutes from "./routes/Atribute.routes.js"
import BrandRoutes from "./routes/Brand.routes.js"
import ProductRoutes from "./routes/Product.routes.js"
import SpecRoutes from "./routes/Spec.routes.js"
import AuthRoutes from "./routes/Auth.routes.js"
import PayRoutes from "./routes/Payment.routes.js"
import CartRoutes from "./routes/Cart.routes.js"
import cors from "cors"
import morgan from "morgan"
import { authJwt } from "./middlewares/jwt.js";
import { errorHandler } from "./middlewares/error_handler.js";



const app = express();



//Middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());
app.use(authJwt());
app.use(errorHandler)




app.use(`${process.env.API_URL}`, UsersRoutes);
app.use(`${process.env.API_URL}`, CategoryRoutes);
app.use(`${process.env.API_URL}`, AtributeRoutes);
app.use(`${process.env.API_URL}`, BrandRoutes);
app.use(`${process.env.API_URL}`, ProductRoutes);
app.use(`${process.env.API_URL}`, SpecRoutes);
app.use(`${process.env.API_URL}`, AuthRoutes);
app.use(`${process.env.API_URL}`, PayRoutes);
app.use(`${process.env.API_URL}`, CartRoutes);




export default app;