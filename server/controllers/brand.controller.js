import { Brand } from '../models/Brand.js'

export const getBrands = async (req, res) => {
    try {
        const Brands = await Brand.findAll()
        res.json(Brands)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getBrand = async (req, res) => {
    try {
        const {id} = req.params;
        
        const Brands = await Brand.findOne({   where: {
            BrandID: id,
        }, });
          
       
      if (!Brands) {
        return res.status(404).json({message: "Marca no existe"});
      }

        res.json(Brands)

    } catch (error) {
        return res.status(500).json({ message: error.message }) 
    }
    


}

export const createBrand = async (req, res) => {
    const { BrandName} = req.body

    try {
        const NewBrand = await Brand.create({
            BrandName: BrandName,
         
        })

        res.json(NewBrand);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
 

}


export const updateBrand = async (req, res) => {

    try {
        const { id } = req.params;
        const { BrandName } = req.body

        const Brands = await Brand.findByPk(id)
        Brands.BrandName = BrandName;
        
        await Brands.save();

        res.json(Brands);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        await Brand.destroy({
            where: {
                BrandID: id,
            },


        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }


}