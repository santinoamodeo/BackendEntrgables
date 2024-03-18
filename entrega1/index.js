class ProductManager {
    #products;
    constructor() {
      this.#products = [];
    }
    /**
     *
     * @param {string} title
     * @param {string} description
     * @param {number} price
     * @param {string} thumbnail
     * @param {string} code
     * @param {numbre} stock
     */
    addProduct(title, description, price, thumbnail, code, stock) {
      const producto = {
        id: this.#getNewId(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      const validarProducto = this.#products.find(
        (producto) => producto.code === code
      );
      if (validarProducto) {
        throw new Error("El producto es parte del array");
      }
      this.#products.push(producto);
    }
  
    getProducts() {
      return this.#products;
    }
  
    getProductById(id) {
      const producto = this.#products.find((producto) => producto.id === id);
      if (!producto) {
        throw new Error(`El producto Id: ${id} no es parte del array`);
      }
      return producto
    }
  
    #getNewId() {
      if (this.#products.length === 0) {
        return 1;
      }
      return this.#products.at(-1).id + 1;
    }
  }