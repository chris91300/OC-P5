
/**
 * @class Cart
 * 
 * Représente le panier de l'utilisateur.
 */

class Cart{

    constructor(modalError){
        this.modalError = modalError;
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
                
                localStorage.setItem(localStorageKey, JSON.stringify(informations));
            }
            
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
   /* addColorProduct(name, color, quantity){

        let localStorageKey = name+ "_" + color;
        let product = localStorage.getItem(localStorageKey);
        product = JSON.parse(product);

        if ( product ) {
            
            this.addQuantityProduct(name, color, quantity);

        } 

    }*/




    /**
     * ajout une nouvelle quantité à la couleur de produit demandé
     * @param {string} name le nom du produit
     * @param {string} color la couleur du produit
     * @param {number} quantity la quantité de produit
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
     * @returns {boolean} false si aucune erreur n'est produite. true sinon
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
     * vide le panier
     */
    clear(){
        localStorage.clear()
    }

    
}