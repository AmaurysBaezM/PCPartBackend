import { Product } from '../models/Products.js'

export const getProducts = async (req, res) => {
    try {
        const Products = await Product.findAll()
        res.json(Products)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getProduct = async (req, res) => {
    try {
        const {id} = req.params;
        
        const Products = await Product.findOne({   where: {
            ProductID: id,
        }, });
          
    
      if (!Products) {
        return res.status(404).json({message: "El producto no existe"});
      }

        res.json(Products)

    } catch (error) {
        return res.status(500).json({ message: error.message }) 
    }
    




}

export const createProduct = async (req, res) => {
    const { ProductName, ProductPrice, ProductAmount, ID_Brand, ID_Category } = req.body

    try {
        const NewProduct = await Product.create({
            ProductName: ProductName,
            ProductPrice: ProductPrice,
            ProductAmount: ProductAmount,
            ID_Brand: ID_Brand,
            ID_Category: ID_Category,
            
        })

        res.json(NewProduct);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

export const updateProduct = async (req, res) => {

    try {
        const { id } = req.params;
        const { ProductName, ProductPrice, ProductAmount, ID_Brand, ID_Category } = req.body

        const Products = await Product.findByPk(id)
        Products.ProductName = ProductName;
        Products.ProductPrice = ProductPrice;
        Products.ProductAmount = ProductAmount;
        Products.ID_Brand = ID_Brand;
        Products.ID_Category = ID_Category;
        await Products.save();

        res.json(Products);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.destroy({
            where: {
                ProductID: id,
            },


        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }


}