
/**
 * @class Item
 * représente un produit dans la page product.html
 * 
 * elle récupère le produit demandé via son l'id dans l'url de la page et inséère dans 
 * le DOM les informations sur le produit.
 */

class Item{

    constructor(){
        this.modalError = new ModalError();
        this.modalSuccess = new ModalSuccess();
        this.url = window.location.href;
        this.baseUrl = "http://localhost:3000/api/products/";
        this.id = getParam(this.url, "id");
        this.url = this.baseUrl + this.id;
        this.data;
        this.cart = new Cart(this.modalError);
        this.init();
        this.addToCartEvent();
    }


    /**
     * inséère dans le DOM les informations sur le produit
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
     *insert l'image du canapé
     * @param {string} imgUrl 
     * @param {string} altText 
     */
    insertImage(imgUrl, altText){

        try{

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
        catch(err){

            this.modalError.showMessage(err.message);
        }
    }



    /**
     * insert la valeur donnée dans l'element ayant l'id donné
     * @param {string} idName 
     * @param {*} value 
     */
    insertData(idName, value){
        let element = document.getElementById(idName);
        element.innerHTML = value;
    }


    /**
     * insert les options de couleur dans le select
     * @param {array} colors les couleurs du canapé possible
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
     * ajoute la possibilité pour l'utilisateur de mettre un produit dans son panier 
     * au click sur le boutton "Ajouter au panier"
     */
    addToCartEvent(){
        let button = document.getElementById("addToCart");
        button.addEventListener("click", this.getInformationsAndSendIntoCart);
    }



    /**
     * Récupère le produit demandé, la couleur choisi ainsi que la quantité
     * et envoi ajoute le produit au panier
     */
    getInformationsAndSendIntoCart = () => {
        let id = this.id;
        let data = {...this.data};
        let color = this.getTheChosenColor();
        let quantity = this.getTheQuantity();

        if ( !(color == undefined || quantity === 0) ){
            
            this.cart.addProduct(data, color, quantity, id);
            this.modalSuccess.showMessage();

        } else {

            this.modalError.showMessage("Il faut une couleur et une quantité (entre 1 et 100) valides.");
            
        }

    }


    /**
     * récupère et retourne la couleur du produit choisi par l'utilisateur
     * @returns { string } la couleur du canapé choisi par l'utilisateur
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
     * récupère et retourne la quantité de produit choisi par l'utilisateur
     * @returns { number } la quantité de canapé choisi par l'utilisateur
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
}