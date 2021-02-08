const fsLibrary  = require('fs') 
const dedicatedbrand = require('./sources/dedicatedbrand');
const toJsonFile = require('./sources/toJsonFile');
const mudjeans = require('./sources/mudjeans');
const adresseparis = require('./sources/adresseparis');
const eshops = ['https://www.dedicatedbrand.com'];
eshops.push('https://mudjeans.eu/');
eshops.push('https://adresse.paris/');

async function sandbox () {
  await dedicated_scrapping(eshops[0]);
  await mudjeans_scrapping(eshops[1]);
  //await adresseparis_scrapping(eshops[2]);

  console.log('All scrapping done');
  process.exit(0);
}
async function dedicated_scrapping(eshop, brand = 'DEDICATED') {
  try {

    let brand = 'DEDICATED';
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    
    //Scrapping home page
    let products = await dedicatedbrand.scrape_products(eshop);
    toJsonFile.productToJsonFile(products, brand, false);
    console.log(products);

    //Scrapping all menu links on home page
    const links = await dedicatedbrand.scrape_links(eshop);

    //Scrapping on all the links
    for(let i = 0; i < links.length; i++){
      actual_link = eshop + links[i];
      console.log(actual_link);
      products = await dedicatedbrand.scrape_products(actual_link);
        toJsonFile.productToJsonFile(products, brand)    
    }

    console.log('Dedicated srapping done');

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
async function mudjeans_scrapping(eshop, brand = 'MUDJEANS'){
  try  {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    //Scrapping home page
    let products = await mudjeans.scrape_products(eshop);
    toJsonFile.productToJsonFile(products, brand,false);
    console.log(products);

    //Scrapping all menu links on home page
    let links_duplicated = await mudjeans.scrape_links(eshop);
    let links = [];

    //Removing duplicates links
    links_duplicated.forEach((link) => {
      if(!links.includes(link)){
        links.push(link);
      }
    })

    //Scrapping on all the links
    for(let i = 0; i < links.length; i++){
      actual_link = eshop + links[i];
      console.log(actual_link);
      products = await mudjeans.scrape_products(actual_link);
      toJsonFile.productToJsonFile(products, brand);
    }

    console.log('Mudjeans scrapping done');    
  } catch (e) {
    console.error(e);
    process.exit(1);
  }  
}

async function adresseparis_scrapping(eshop, brand = 'ADRESSE PARIS'){
  try  {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

      //Scrapping home page

      let products = await adresseparis.scrape_products(eshop);
      toJsonFile.productToJsonFile(products, brand,false);
      console.log(products);
      
         //Scrapping all menu links on home page
    let links_duplicated = await adresseparis.scrape_links(eshop);
    let links = [];

      //Removing duplicates links
      links_duplicated.forEach((link) => {
        if(!links.includes(link)){
          links.push(link);
        }
      })
  


    //Scrapping on all the links
    for(let i = 0; i < links.length; i++){
      actual_link = links[i];
      console.log(actual_link);
      products = await adresseparis.scrape_products(actual_link);
     // toJsonFile.productToJsonFile(products, brand);
    }
      console.log('Adresse Paris scrapping done');    
    } catch (e) {
      console.error(e);
      process.exit(1);
    } 
}





const [,, eshop] = process.argv;

sandbox(eshop);