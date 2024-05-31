import { Category } from '../models/Category.js'

export const getCategories = async (req, res) => {
    try {
        const Categorys = await Category.findAll()
        res.json(Categorys)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getCategory = async (req, res) => {
    try {
        const {id} = req.params;
        
        const Categorys = await Category.findOne({   where: {
            CategoryID: id,
        }, });
          
      
      if (!Categorys) {
        return res.status(404).json({message: "Categoria no existe"});
      }

        res.json(Categorys)

    } catch (error) {
        return res.status(500).json({ message: error.message }) 
    }
    


}

export const createCategory = async (req, res) => {
    const { CategoryName} = req.body

    try {
        const NewCategory = await Category.create({
            CategoryName: CategoryName,
         
        })

        res.json(NewCategory);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
 

}


export const updateCategory = async (req, res) => {

    try {
        const { id } = req.params;
        const { CategoryName } = req.body

        const Categorys = await Category.findByPk(id)
        Categorys.CategoryName = CategoryName;
        
        await Categorys.save();

        res.json(Categorys);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.destroy({
            where: {
                CategoryID: id,
            },


        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }


}