import { Shopping_Cart } from '../models/Shopping_Cart.js'
import { User } from '../models/Users.js';
import { sequelize } from '../database/database.js'
import {QueryTypes} from 'sequelize'

export const getCarts = async (req, res) => {
    try {
        const Cart = await Shopping_Cart.findAll()
        res.json(Cart)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getCart = async (req, res) => {
    try {
        const {id} = req.params;
        
        const Carts = await Shopping_Cart.findOne({   where: {
            CartID: id,
        }, });
          
      
      if (!Carts) {
        return res.status(404).json({message: "No existe"});
      }

        res.json(Carts)

    } catch (error) {
        return res.status(500).json({ message: error.message }) 
    }
    


};

export const getCartbyUser = async(req, res) => {
    try {
        const { id } = req.params;
        const Users = await User.findOne({   where: {
            UserID: id,
        }, });
          
    
      if (!Users) {
        return res.status(404).json({message: "El usuario no existe"});
      }
        const Carts = await sequelize.query('SELECT * from get_product_cart_info_by_user(:userid);', {
            replacements: { userid: id },
            type: QueryTypes.SELECT,
          });

          if (!Carts) {
            return res.status(404).json({message: "No tienes carrito de compra"});
          }

        
          
    
            res.status(200).json( { Productos: Carts })
            
    } catch (error) {
        return res.status(500).json({ message: error.message }) 
    }
  
  
    
}

export const createCarts = async (req, res) => {
    const { ID_User, ID_Product, CartAmount} = req.body

    try {
        const NewCarts = await Shopping_Cart.create({
            ID_User: ID_User,
            ID_Product: ID_Product,
            CartAmount: CartAmount
         
        })

        res.json(NewCarts);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
 

}

export const CartsbyUserAndProduct = async (req, res) => {
    const { ID_User, products } = req.body; // 'products' debería ser un arreglo de objetos con ID_Product y CartAmount
    try {
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "El arreglo de productos está vacío o no es válido." });
        }

        // Usaremos un array para almacenar las respuestas de cada operación
        const results = [];

        for (const product of products) {
            const { ID_Product, CartAmount } = product;

            // Buscar el carrito con el producto específico para el usuario
            let cart = await Shopping_Cart.findOne({
                where: {
                    ID_User: ID_User,
                    ID_Product: ID_Product
                }
            });

            if (!cart) {
                // Crear un nuevo carrito si no existe
                const newCart = await Shopping_Cart.create({
                    ID_User: ID_User,
                    ID_Product: ID_Product,
                    CartAmount: CartAmount
                });
                results.push(newCart);
            } else {
                // Actualizar la cantidad en el carrito existente
                cart.CartAmount = CartAmount;
                await cart.save();
                results.push(cart);
            }
        }

        res.json({ message: "Operaciones realizadas correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateCart = async (req, res) => {

    try {
        const { id } = req.params;
        const { CartAmount } = req.body

        const Cart = await Shopping_Cart.findByPk(id)
        Cart.CartAmount = CartAmount;
        
        await Cart.save();

        res.json(Cart);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteCart = async (req, res) => {
    try {
        const { id } = req.params;
        await Shopping_Cart.destroy({
            where: {
                CartID: id,
            },


        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }


}