
/**
 * @class Cart
 * 
 * The user cart. Communicate with the localstorage
 */

class Cart{

    /**
     * 
     * @param {object} modalError an instance of the modalError object
     */
    constructor(modalError){
        this.modalError = modalError;
    }


    /**
     * add a product into the localstorage
     * 
     * @param {object} data informations about the product
     * @param {string} color product color
     * @param {number} quantity product quantity
     * @param {string} id product id
     */
    addProduct(data, color, quantity, id){
        try {

            let name = data.name;
            let localStorageKey = name+ "_" + color;
            let product = localStorage.getItem(localStorageKey);
            product = JSON.parse(product);

            if ( product ){
                this.addQuantityProduct(name, color, quantity);
            } else {

                let informations = {};
                informations.name = name;
                informations.id = id;
                informations.imageUrl = data.imageUrl;
                informations.altTxt = data.altTxt;
                informations.color = color;
                informations.price = data.price;
                informations.quantity = quantity;
                
                localStorage.setItem(localStorageKey, JSON.stringify(informations));
            }
            
        }
        catch(err){
            this.modalError.showMessage(err.message)
        }
        
        
    }



    /**
     * add a quantity to the product if is already in the localstorage
     * 
     * @param {string} name product name
     * @param {string} color product color
     * @param {number} quantity product quantity
     */
    addQuantityProduct(name, color, quantity){

        try{

            let localStorageKey = name+ "_" + color;
            let product = localStorage.getItem(localStorageKey);
            product = JSON.parse(product);
            
            if ( product == undefined ){
                throw new Error("Le produit n'est pas dans le panier.");
            }
                
            let quantityAlreadyDefine = product.quantity;
            let newQuantity = parseInt(quantityAlreadyDefine) + parseInt(quantity);
            product.quantity = newQuantity;

            localStorage.setItem(localStorageKey, JSON.stringify(product));

        }
        catch(err) {

            this.modalError.showMessage(err.message)

        }
        
        
    }




    /**
     * get user cart
     * 
     * @returns {object} the user cart. the list of his products
     */
    getProducts(){
        let products = {...localStorage};
        return products;
    }



    /**
     * remove a product into the localstorage
     * @param {string} name product name
     * @param {string} color product color
     * @returns {boolean} there is an error ( false is no error. else true )
     */
    removeProduct(name, color) {
        
        let key = name+"_"+color;
        let product = localStorage.getItem(key);

        if ( product ) {

            localStorage.removeItem(key)
            return false;

        } else {

            this.modalError.showMessage("aucun produit de ce nom et avec cette couleur dans le panier");
            return true;

        }
    }



    /**
     * empty the localstorage
     */
    clear(){
        localStorage.clear()
    }

    
}