import puppeteer from 'puppeteer';
import randomUseragent from 'random-useragent';

export const GetGasolinaPrice = async () => {
  try {
    const header = randomUseragent.getRandom();

    const browser = await puppeteer.launch({ headless: true }); // headless: true by default
    const page = await browser.newPage();
    await page.setUserAgent(header);
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('https://micm.gob.do/', {timeout: 0});

     // Espera a que la sección específica esté presente
     await page.waitForSelector('section.elementor-section.elementor-inner-section.elementor-element.elementor-element-0acf107');

   // Extrae los precios y nombres dentro de la sección específica
   const items = await page.evaluate(() => {
    // Selecciona la sección específica
    const section = document.querySelector('section.elementor-section.elementor-inner-section.elementor-element.elementor-element-0acf107');
    
    if (!section) {
        return [];
    }

    // Selecciona todos los divs que contienen el precio y el nombre
    const divs = section.querySelectorAll('div[style*="margin-top"]');

    // Mapea los divs a un array de objetos con precio y nombre
    return Array.from(divs).map(div => {
        // Extrae el precio y el nombre
        const [priceText, nameText] = div.innerHTML.split('<br>');
        const price = priceText.trim();
        const name = nameText.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '').trim();
        
        return { price, name };
    });
});

// Imprime los resultados
console.log('Items encontrados:', items);
    
    

    await browser.close();
    return nodes;

  } catch (error) {
    console.error('Error in GetGasolinaPrice:', error);
    throw error; // Re-throw error to be caught by calling function
  }
};
