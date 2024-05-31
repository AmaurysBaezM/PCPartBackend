import { Spec} from '../models/Specs.js'

export const getSpecs = async (req, res) => {
    try {
        const Specs = await Spec.findAll()
        res.json(Specs)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getSpec = async (req, res) => {
    try {
        const {id} = req.params;
        
        const Specs = await Spec.findOne({   where: {
            SpecID: id,
        }, });
          
    
      if (!Specs) {
        return res.status(404).json({message: "Especificacion no existe"});
      }

        res.json(Specs)

    } catch (error) {
        return res.status(500).json({ message: error.message }) 
    }
    




}

export const createSpec = async (req, res) => {
    const { ID_Atribute, ID_Product, SpecValue } = req.body

    try {
        const NewSpec = await Spec.create({
            ID_Atribute: ID_Atribute,
            ID_Product: ID_Product,
            SpecValue: SpecValue,
           
        })

        res.json(NewSpec);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

export const updateSpec = async (req, res) => {

    try {
        const { id } = req.params;
        const { ID_Atribute, ID_Product, SpecValue } = req.body


        const Specs = await Spec.findByPk(id)
        Specs.ID_Atribute = ID_Atribute;
        Specs.ID_Product = ID_Product;
        Specs.SpecValue = SpecValue;
       
        await Specs.save();

        res.json(Specs);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteSpec = async (req, res) => {
    try {
        const { id } = req.params;
        await Spec.destroy({
            where: {
                SpecID: id,
            },


        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }


}