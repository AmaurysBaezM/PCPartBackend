import { Product } from '../models/Products.js'

export const getProducts = async (req, res) => {
    try {
        // Obtener parámetros de paginación del cuerpo de la solicitud
        const { page = 1, pageSize = 10 } = req.body;

        // Convertir los parámetros a números enteros
        const currentPage = parseInt(page, 10);
        const pageSizeNumber = parseInt(pageSize, 10);

        // Calcular el offset
        const offset = (currentPage - 1) * pageSizeNumber;

        // Obtener los productos con paginación
        const { count, rows: products } = await Product.findAndCountAll({
            limit: pageSizeNumber,
            offset: offset
        });

        // Calcular el número total de páginas
        const totalPages = Math.ceil(count / pageSizeNumber);

        // Responder con los productos y datos de paginación
        res.json({
            products,
            pagination: {
                totalItems: count,
                totalPages: totalPages,
                currentPage: currentPage,
                pageSize: pageSizeNumber
            }
        });
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