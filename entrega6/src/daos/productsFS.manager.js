// CRUD en Archivos (Files System)
import fs from 'node:fs'
import { __dirname } from '../filenameUtils.js'

const path = `${__dirname}/FS-Database/Products.json`;
class ProductManager {
    

    constructor(path) {
        this.path = path;
        
    }
    readProductsJson = async () => {
        try {
            const productsJson = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(productsJson);
        } catch (error) {
            return [];
        }
        
    }

    writeProduct = async (productsData) => {
        await fs.promises.writeFile(this.path, JSON.stringify(productsData, null, '\t'), 'utf-8');
    }
    
    getProducts = async () => {
        return await this.readProductsJson();
    }
 
    
    addProduct = async (title, description, code, price, status, stock, category, thumbnails = './images/IMG_placeholder.jpg') => {
        try {
        const product = {
            id: await this.getNextId(),
            title: title,
            description: description,
            code: code,
            price: price,
            status: status,
            stock: stock,
            category: category,
            thumbnails: thumbnails
        };
        
        const productsData = await this.readProductsJson();

        const codeExistsCheck = productsData.find((prod) => prod.code === code);
        
        const completeProductCheck = [];
        for (const prop in product) {
            if (!product[prop]) {
                completeProductCheck.push(prop);
            }
        }
        

        if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category) {
            if(completeProductCheck.length > 1) 
                throw new Error(`¡ERROR! debe llenar todods los campos del producto nuevo\nFaltaron agregar ${completeProductCheck.join(', ')}`);
            
            throw new Error(`¡ERROR! debe llenar todods los campos del producto nuevo\nFaltó agregar ${completeProductCheck.join(', ')}`);
               
        };

        if (typeof title !== 'string' || typeof description !== 'string' || typeof code !== 'string' || typeof category !== 'string' || typeof thumbnails !== 'string') {
            throw new Error("title, description, thumbnails, y code deben ser string");
        }

        if (typeof price !== 'number' || typeof stock !== 'number') {
            throw new Error("price y stock deben ser numeros");
        }

        if (typeof status !== 'boolean') {
            throw new Error("status debe ser booleano");
        }
        
        if (codeExistsCheck){
            throw new Error(`¡ERROR! Producto ${product.title} no agregado\nEl código ${product.code} ya está siendo utlizado por el producto ${codeExistsCheck.title}, con el id ${codeExistsCheck.id}`);
        }; 
            
            productsData.push(product);
            this.writeProduct(productsData)
            return productsData
            
        } catch (error) {
            return error;
        }
            
    };
    
    getProductsById = async (productId) => {
        try {
            const productsData = await this.readProductsJson();

            const idCheck = productsData.find((prod) => prod.id === productId);
            
              return idCheck;

        } 
    
          catch (error) {
            return error;
            
          }
    };   

    updateProduct = async (productId, updatedProduct) => {
        try {
            const productsData = await this.readProductsJson();
            const productIndex = await productsData.findIndex(product => product.id === productId);

            if(await productIndex === -1){
                throw new Error(`El Producto con el id: ${productId} no existe`);
            }
            
            const newUpdatedProduct = {
                ...productsData[productIndex],
                ...updatedProduct
            };
            
            productsData[productIndex] = newUpdatedProduct;
            
            
            this.writeProduct(productsData)
            return productsData;

            
        } catch (error) {
            
            throw new Error('Error', error)
        }

    }

    deleteProduct = async (productId) => {
        const productsData = await this.readProductsJson();
        
        const productToDeleteIndex = productsData.findIndex(product => product.id === productId);
        if (productToDeleteIndex === -1) {
            return `No existe el producto con id: ${productId}`;
        }
        console.log(`EL producto ${productsData[productToDeleteIndex].title} con el id ${productId} fue eliminado`);
        productsData.splice(productToDeleteIndex, 1);
        this.writeProduct(productsData)
        };   
    
        
    getNextId = async () => {
        const productsData = await this.readProductsJson();
            if (productsData.length === 0) {
                return 1;
              };
              return productsData[productsData.length -1].id + 1;
    };
};

export default ProductManager;