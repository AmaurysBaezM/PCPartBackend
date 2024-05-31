import { Atribute } from '../models/Atribute.js'

export const getAtributes = async (req, res) => {
    try {
        const Atributes = await Atribute.findAll()
        res.json(Atributes)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAtribute = async (req, res) => {
    try {
        const {id} = req.params;
        
        const Atributes = await Atribute.findOne({   where: {
            AtributeID: id,
        }, });
          
      
      if (!Atributes) {
        return res.status(404).json({message: "Atributo no existe"});
      }

        res.json(Atributes)

    } catch (error) {
        return res.status(500).json({ message: error.message }) 
    }
    



}

export const createAtribute = async (req, res) => {
    const { AtributeName} = req.body

    try {
        const NewAtribute = await Atribute.create({
            AtributeName: AtributeName,
         
        })

        res.json(NewAtribute);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    } 
 

}


export const updateAtribute = async (req, res) => {
    try {
        const { id } = req.params;
        const { AtributeName } = req.body

        const Atributes = await Atribute.findByPk(id)
        Atributes.AtributeName = AtributeName;
        
        await Atributes.save();

        res.json(Atributes);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
   
}

export const deleteAtribute = async (req, res) => {
    try {
        const { id } = req.params;
        await Atribute.destroy({
            where: {
                AtributeID: id,
            },


        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }


}
