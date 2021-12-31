

/**
 * @class CartSummary
 * gère la page du panier. 
 * récupération du panier et affichage des différents produits mis dans le panier via la class CartSummaryProduct
 * initialise la class FormUser qui gère le formulaire
 * 
 */

class CartSummary{

    constructor(){
        this.container = document.getElementById("cart__items");
        this.modalError = new ModalError();
        this.totalQuantity = 0;
        this.totalPrice = 0;
        this.cart = new Cart(this.modalError);
        this.form = new FormUser(this);


        this.init();
    }


    /**
     * récupère le panier de l'utilisateur et envoie chaque produit à CartSummaryProduct
     */
    init(){

        let products = this.cart.getProducts();
        if ( Object.keys(products).length != 0) {
            Object.entries(products).map(([ key, informations])=>{
            
                informations = JSON.parse(informations);
                new CartSummaryProduct(this.container, informations, this);         
                
            })
        } else {
            this.initEmptyCart();
        }

    }



    /**
     * ajoute une quantité de produit à la quantité total
     * @param {*} quantity la quantité à ajouter
     */
    addTotalQuantity(quantity){
        if(typeof quantity === "string"){
            quantity = parseInt(quantity);
        }

        this.totalQuantity += quantity;
        this.insertTotalQuantity();
    }



    /**
     * ajoute un prix de produit au prix total
     * @param {*} price le prix à ajouter
     * @param {*} quantity la quantité de produit
     */
    addTotalPrice(price, quantity){
        console.log("addtotalprice")
        console.log(price + " x " + quantity)
        if(typeof price === "string"){
            price = parseFloat(price);
        }

        if(typeof quantity === "string"){
            quantity = parseInt(quantity);
        }
        console.log(price * quantity)
        this.totalPrice += ( price * quantity );
        this.insertTotalPrice();
    }



    /**
     * insert dand le DOM la quantité totale
     */
    insertTotalQuantity(){
        let quantityElement = document.getElementById("totalQuantity");
        quantityElement.innerHTML = this.totalQuantity;
    }


    /**
     * insert dand le DOM le prix total
     */
    insertTotalPrice(){
        let priceElement = document.getElementById("totalPrice");
        priceElement.innerHTML = this.totalPrice;
    }



    /**
     * si le panier de l'utilisateur est vide alors on change le titre h1 pour qu'il affiche
     *  VOTRE PANIER EST VIDE
     * nombre d'article affichera 0 et prix 0€
     */
    initEmptyCart(){
        let title = document.querySelector("h1");
        title.innerHTML = "VOTRE PARNIER EST VIDE";
        this.insertTotalQuantity();
        this.insertTotalPrice();
    }



    /**
     * demande au panier d'ajouter une quantité au produit 
     * @param {string} name le nom du produit
     * @param {string} color la couleur du produit
     * @param {*} quantity la quantité à ajouter
     */
    addQuantityProductToCart(name, color, quantity){

        this.cart.addQuantityProduct(name, color, quantity);
    }



    /**
     * demande au panier de supprimer un produit
     * @param {string} name le nom du produit
     * @param {string} color la couleur du produit 
     */
    removeProduct(name, color) {

        let error = this.cart.removeProduct(name, color);
        return error;
    }



    /**
     * regarde si le panier est vide.
     * si vide alors on lance this.initEmptyCart()
     * sinon rien
     */
    checkIfCartIsEmpty(){
        let products = this.cart.getProducts();

        if ( Object.keys(products).length === 0){
            this.initEmptyCart();
        }

    }




    /**
     * regarde si le panier est vide
     * @returns { boolean } true si le panier est vide sinon false
     */
    doesCartIsEmpty(){
        let cartIsEmpty = false;

        let products = this.cart.getProducts();

        if ( Object.keys(products).length === 0){
            cartIsEmpty = true
        }

        return cartIsEmpty;
    }


    /**retirer modal error des autre class et passer par la */
    sendError(message) {
        this.modalError.showMessage(message);
    }



    /**
     * créer un tableau contenant les identifiants des produits du panier
     * @returns { array } la liste des ID des produits
     */
    getCart(){
        let products = this.cart.getProducts();
        let listOfProducts = [];

        Object.entries(products).map(([ key, data ])=>{
            
            data = JSON.parse(data)
            let id = data.id;
            listOfProducts.push(id);
        })

        return listOfProducts;
    }



    /**
     * demande à Cart de vider le panier
     */
    clearCart(){
        this.cart.clear();
    }
}