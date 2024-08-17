import { GetGasolinaPrice } from '../helpers/scrapper_helper.js';

export const getPrice = async (req, res) => {
  try {
    const price = await GetGasolinaPrice();
       return res.status(200).json({ price });

  } catch (error) {
    console.error('Error in getPrice:', error);
    return res.status(500).json({ type: error.name, message: error.message });
  }
};
