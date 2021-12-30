
/**
 * @class Cart
 * 
 * Réprésente le panier de l'utilisateur.
 */

class Cart{

    constructor(modalError){
        this.modalError = modalError;
        console.log("CART");
        console.log({...localStorage});
        //localStorage.clear() 
    }


    /**
     * ajoute un produit dans le localStorage
     * 
     * @param {object} data les informations sur le produit
     * @param {string} color la couleur du produit
     * @param {number} quantity la quantité de produit
     * @param {string} id l'identifiant du produit'
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
                console.log(informations)
                console.log(data)
                localStorage.setItem(localStorageKey, JSON.stringify(informations));
            }

            console.log("après l'ajout du produit localStorage vaut");
            console.log(localStorage);
        }
        catch(err){
            this.modalError.showMessage(err.message)
        }
        
        
    }



    /**
     * ajout une nouvelle couleur au produit demandé
     * @param {string} name le nom du produit
     * @param {string} color la couleur du produit
     * @param {number} quantity la quantité de produit
     */
    addColorProduct(name, color, quantity){
        let localStorageKey = name+ "_" + color;
        let product = localStorage.getItem(localStorageKey);
        product = JSON.parse(product);

        if ( product ) {
            
            this.addQuantityProduct(name, color, quantity);

        } /*else {
        // A SUPPRIMER
        console.log("on est laaaaaaaaaaaaaaa")
            product.color = {};
            product["colors"][color]["quantity"] = quantity;
            localStorage.setItem(id, JSON.stringify(product));
        }*/


    }




    /**
     * ajout une nouvelle quantité à la couleur de produit demandé
     * @param {string} name le nom du produit
     * @param {string} color la couleur du produit
     * @param {number} quantity la quantité de produit
     */
    addQuantityProduct(name, color, quantity){
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




    /**
     * permet de récupérer le contenu du panier de l'utilisateur
     * 
     * @returns le panier de l'utilisateur. La liste des produits de son panier
     */
    getProducts(){
        let products = {...localStorage};
        return products;
    }



    /**
     * supprime le produit du panier
     * @param {string} name le nom du produit
     * @param {string} color la couleur du produit
     */
    removeProduct(name, color) {
        console.log("on supprime un produit "+name+"_"+color)
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
     * vide le panier
     */
    clear(){
        localStorage.clear()
    }

    
}