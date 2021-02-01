/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const mudjeans = require('./sources/mudjeans');
const addresseparis = require('./sources/addresseparis');

async function sandbox (brand = 'dedicated',eshop = 'https://www.dedicatedbrand.com/en/men/t-shirts') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const selectBrand = {
      'dedicated' : dedicatedbrand,
      'mud' : mudjeans,
      'addresse': addresseparis
    };

    const scrapper = selectBrand[brand];
    const products = await scrapper.scrape(eshop);
    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,,brand, eshop] = process.argv;
sandbox(eshop);

