import { Shopping_Cart } from '../models/Shopping_Cart.js'
import { User } from '../models/Users.js';

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
        const Carts = await sequelize.query('SELECT * FROM get_product_cart_info_by_user(:userid);', {
            replacements: { userid: id },
            type: QueryTypes.SELECT,
          });

          if (!Carts) {
            return res.status(404).json({message: "Especificacion no existe"});
          }

        
          
    
            res.status(200).json( Carts)
            
    } catch (error) {
        return res.status(500).json({ message: error.message }) 
    }
  
  
    try {
        const {id} = req.params;
        
        const Carts = await Shopping_Cart.findAll({   where: {
            ID_User: id,
        }, });
          
      
      if (!Carts) {
        return res.status(404).json({message: "No tienes productos en tu carrito"});
      }

        res.json(Carts)

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

export const CartsbyUserAndProduct = async (req, res)=> {
    const { ID_User, ID_Product, CartAmount} = req.body
    try {
      
        
        const Carts = await Shopping_Cart.findOne({   where: {
            ID_User: ID_User,
            ID_Product: ID_Product
        }, });
          
      
      if (!Carts) {
        const NewCarts = await Shopping_Cart.create({
            ID_User: ID_User,
            ID_Product: ID_Product,
            CartAmount: CartAmount
         
        })
        res.json(NewCarts)
      }
      else {
      
        Carts.CartAmount = CartAmount;
        
        await Cart.save();

      }

        res.json(Carts)

    } catch (error) {
        return res.status(500).json({ message: error.message }) 
    }


}

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