
/**
 * @class Item
 * represente the product part into the product page
 * 
 * get the product id into the url page 
 * get current data product
 * insert data into the DOM
 */

class Item{

    constructor(){
        this.modalError = new ModalError();
        this.modalSuccess = new ModalSuccess();
        this.url = window.location.search;
        this.baseUrl = "http://localhost:3000/api/products/";
        this.id = this.getParam(this.url, "id");
        this.url = this.baseUrl + this.id;
        this.data;
        this.cart = new Cart(this.modalError);
        this.init();
        this.addToCartEvent();
    }


    /**
     * get the parameter id in the url of the page
     * @param {string} url url where find the parameter
     * @param {string} param the parameter to find in the url
     */
    getParam(url, param) {
        try{
            return getParam(url, param);
        }
        catch (err ){
            this.modalError.showMessage(err.message)
        }
    }


    /**
     * insert into the DOM the data product
     */
    async init(){

        try{

            this.data = await useFetch(this.url);
            this.insertImage(this.data.imageUrl, this.data.altTxt);
            this.insertData("title", this.data.name);
            this.insertData("price", this.data.price);
            this.insertData("description", this.data.description);
            this.insertColorsOption(this.data.colors);

        }
        catch(err){

            this.modalError.showMessage(err.message);
        }
    }


    /**
     * create the image of the product
     * @param {string} imgUrl url of the image
     * @param {string} altText alt attribut of the image
     */
    insertImage(imgUrl, altText){

        let container = document.getElementsByClassName("item__img")[0];
        let image = createElement({
            parent : container,
            action : "appendChild",
            typeElement : "img",
            attributes : { 
                "src" : imgUrl,
                "alt" : altText
                }
        });

    }



    /**
     * insert the value into the DOM element with the idName
     
     * @param {string} idName element id
     * @param {*} value element value
     */
    insertData(idName, value){
        let element = document.getElementById(idName);
        element.innerHTML = value;
    }


    /**
     * insert color options into the select
     * @param {array} colors the possible colors
     */
    insertColorsOption(colors){
        let select = document.getElementById("colors");
        
        colors.map((color)=>{
            createElement({
                parent : select,
                action : "appendChild",
                typeElement : "option",
                attributes : { 
                    "value" : color
                    },
                text : color
            });
        })
        
    }



    /**
     * add the possibility for the user to add a product into his cart
     * on click to the button "Ajouter au panier"
     */
    addToCartEvent(){
        let button = document.getElementById("addToCart");
        button.addEventListener("click", this.getInformationsAndSendIntoCart);
    }



    /**
     * get the product color and quantity
     * and add the product into the cart
     */
    getInformationsAndSendIntoCart = () => {
        let id = this.id;
        let data = {...this.data};
        let color = this.getTheChosenColor();
        let quantity = this.getTheQuantity();

        if ( !(color == undefined || quantity === 0) ){
            
            this.cart.addProduct(data, color, quantity, id);
            this.modalSuccess.showMessage();
            this.resetvalueColorAndQuantity();

        } else {

            this.modalError.showMessage("Il faut une couleur et une quantité (entre 1 et 100) valides.");
            
        }

    }


    /**
     * get and return the product color value
     * @returns { string } the product color choosen by user
     */
    getTheChosenColor(){
        let colors = document.getElementById("colors");
        let options = colors.options;
        let index = colors.selectedIndex;
        let option = options[index];
        let color = option.value;
        let colorsPossible = this.data.colors;

        if ( colorsPossible.includes(color)){

            return color;

        } else {
            
            return undefined;
        }
        
    }



    /**
     * get and return the product quantity value
     * 
     * @returns { number } the product quantity (input quantity value)
     */
    getTheQuantity(){
        let quantityElement = document.getElementById("quantity");
        let quantity = quantityElement.value;
        
        if ( typeof( quantity ) === "string" & quantity >= 1 && quantity <= 100){
            
            return Number(quantity);

        }else {

            return 0;

        }
    }



    /**
     * reset color and quantity values
     */
    resetvalueColorAndQuantity(){
        let couleurs = document.getElementById("colors");
        let quantity = document.getElementById("quantity");
        
        couleurs.selectedIndex = 0;
        quantity.value = 0;
       
    }
}