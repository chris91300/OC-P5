

/**
 * @class CartSummary
 * manage the cart page. 
 * get user cart and show the different product with the class CartSummaryProduct
 * 
 * initialize the class FormUser who manage the form
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
     * get user cart and send each data product to CartSummaryProduct
     */
    init(){
        try{

            let products = this.cart.getProducts();

            if ( Object.keys(products).length != 0) {

                Object.entries(products).map(([ key, informations])=>{
                
                    informations = JSON.parse(informations);
                    new CartSummaryProduct(this.container, informations, this);         
                    
                })

            } else {

                this.initEmptyCart();

            }

        } catch(err) {

            this.sendError(err.message);

        }

    }



    /**
     * add a quantity of a product to the total quantity
     * 
     * @param {*} quantity the quantity to add
     */
    addTotalQuantity(quantity){

        if(typeof quantity === "string"){
            quantity = parseInt(quantity);
        }

        this.totalQuantity += quantity;
        this.insertTotalQuantity();

    }



    /**
     * calculate and add a price to the total price.
     * 
     * @param {*} price the price of the product
     * @param {*} quantity the quantity of product
     */
    addTotalPrice(price, quantity){
        
        if(typeof price === "string"){
            price = parseFloat(price);
        }

        if(typeof quantity === "string"){
            quantity = parseInt(quantity);
        }
        
        this.totalPrice += ( price * quantity );
        this.insertTotalPrice();
    }



    /**
     * insert into the DOM the total quantity of product
     */
    insertTotalQuantity(){

        let quantityElement = document.getElementById("totalQuantity");
        quantityElement.innerHTML = this.totalQuantity;

    }


    /**
     * insert into the DOM the total price
     */
    insertTotalPrice(){

        let priceElement = document.getElementById("totalPrice");
        priceElement.innerHTML = this.totalPrice;

    }



    /**
     * change the h1 title for ' VOTRE PANIER EST VIDE '
     * 
     * total quantiy qu 0
     * total price equal 0
     */
    initEmptyCart(){

        let title = document.querySelector("h1");
        title.innerHTML = "VOTRE PARNIER EST VIDE";
        this.insertTotalQuantity();
        this.insertTotalPrice();

    }



    /**
     * ask to Cart to add a quantity to the product
     * 
     * @param {string} name product name
     * @param {string} color product color
     * @param {*} quantity product quantity
     */
    addQuantityProductToCart(name, color, quantity){

        this.cart.addQuantityProduct(name, color, quantity);
    }



    /**
     * ask to Cart to remove a product
     * @param {string} name product name
     * @param {string} color product color 
     */
    removeProduct(name, color) {

        let error = this.cart.removeProduct(name, color);
        return error;
    }



    /**
     * check if the user cart is empty
     * 
     * if empty we use this.initEmptyCart()
     * 
     * else we do nothing
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


    /**
     * send a message to the modalError
     */
    sendError(message) {
        this.modalError.showMessage(message);
    }



    /**
     * get the user cart and create an array of id product
     * 
     * @returns { array } the list of the id product
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
     * ask to Cart to empty the cart
     */
    clearCart(){
        this.cart.clear();
    }
}