
/**
 * @class CartSummaryProduct
 * 
 * show the informations about the product
 */
class CartSummaryProduct{

    /**
     * 
     * @param {object} container the element in which insert the elements created in this class
     * @param {object} informations the product informations
     * @param {object} cartSummary an instance of the class CartSummary
     */
    constructor(container, informations, cartSummary){
        this.container = container;
        this.informations = informations;
        this.name = this.informations.name;
        this.imageUrl = this.informations.imageUrl;
        this.altTxt = this.informations.altTxt;
        this.color = this.informations.color;
        this.price = this.informations.price;
        this.quantity = this.informations.quantity;
        this.cartSummary = cartSummary;
        this.article;
        

        this.init();

    }


    /**
     * creation of the product and insert it into the DOM
     */
    init(){
        
        this.article = createElement({
            parent : this.container,
            action : "appendChild",
            typeElement : "article",
            classElement : "cart__item",
            attributes : { "data-id" : this.id, "data-color" : this.color}
        });

        this.createImg(this.article);
        this.createContent(this.article);

        this.cartSummary.addTotalPrice(this.price, this.quantity);
        this.cartSummary.addTotalQuantity(this.quantity);
        

    }


    /**
     * creation of image part
     */
    createImg(article){
        let containerImage = createElement({
            parent : article,
            action : "appendChild",
            typeElement : "div",
            classElement : "cart__item__img",
        });

        let image = createElement({
            parent : containerImage,
            action : "appendChild",
            typeElement : "img",
            attributes : { "src" : this.imageUrl, "alt" : this.altTxt}
        });
    }


    /**
     * creation of content part
     */
    createContent(article){
        let containerContent = createElement({
            parent : article,
            action : "appendChild",
            typeElement : "div",
            classElement : "cart__item__content",
        });

        this.createContentDescription(containerContent);
        this.createContentSettings(containerContent);
    }

    /**
     * creation of description part
     */
    createContentDescription(container){
        let containerDescription = createElement({
            parent : container,
            action : "appendChild",
            typeElement : "div",
            classElement : "cart__item__content__description",
        });

        let descriptionTitle = createElement({
            parent : containerDescription,
            action : "appendChild",
            typeElement : "h2",
            text : this.name
        });

        let descriptionColor = createElement({
            parent : containerDescription,
            action : "appendChild",
            typeElement : "p",
            text : this.color
        });

        let descriptionPrice = createElement({
            parent : containerDescription,
            action : "appendChild",
            typeElement : "p",
            text : this.price.toString() + " €"
        });
    }


    /**
     * creation of settings part
     */
    createContentSettings(container){
        let containerSettings = createElement({
            parent : container,
            action : "appendChild",
            typeElement : "div",
            classElement : "cart__item__content__settings",
        });

        this.createContentSettingsQuantity(containerSettings)
        this.createContentSettingsDelete(containerSettings)
    }


    /**
     * creation of quantity part
     */
    createContentSettingsQuantity(container){

        let containerQuantity = createElement({
            parent : container,
            action : "appendChild",
            typeElement : "div",
            classElement : "cart__item__content__settings__quantity",
        });

        let quantityText = createElement({
            parent : containerQuantity,
            action : "appendChild",
            typeElement : "p",
            text : "Qté : "
        });

        let quantityInput = createElement({
            parent : containerQuantity,
            action : "appendChild",
            typeElement : "input",
            classElement : "itemQuantity",
            attributes : {
                "type" : "number",
                "name" : "itemQuantity",
                "min" :"1",
                "max" :"100", 
                "value" : this.quantity.toString()}
        });

       quantityInput.addEventListener("change", this.quantityChanged);
    }


    /**
     * creation of delete part
     */
    createContentSettingsDelete(container){

        let containerDelete = createElement({
            parent : container,
            action : "appendChild",
            typeElement : "div",
            classElement : "cart__item__content__settings__delete",
        });

        let deleteButton = createElement({
            parent : containerDelete,
            action : "appendChild",
            typeElement : "p",
            classElement : "deleteItem",
            text : "Supprimer"
        });


        deleteButton.addEventListener("click", this.removeProduct)
    }



    /**
     * change of item quantity to change of product quantity
     */
    quantityChanged = (e) => {
        try{

            let input = e.currentTarget;
            let newQuantity = input.value;
            let diff = parseInt(newQuantity) - parseInt(this.quantity);
            let name = this.name;
            let color = this.color;
            let price = this.price; 

            this.cartSummary.addTotalPrice(price, diff);
            this.cartSummary.addTotalQuantity(diff);

            this.cartSummary.addQuantityProductToCart(name, color, diff);
            this.quantity = newQuantity;

        }
        catch(err){
            this.cartSummary.sendError(err.message);
        }
        
    }



    /**
     * remove the product from the cart
     */
    removeProduct = () => {
        
        try{

            let name = this.name;
            let color = this.color;
            let error = this.cartSummary.removeProduct(name, color);

            if( !error ) {

                let quantity = parseInt(this.quantity) * -1;
                let price = this.price;

                this.container.removeChild(this.article);
                this.cartSummary.addTotalQuantity(quantity);
                this.cartSummary.addTotalPrice(price, quantity);
                this.cartSummary.checkIfCartIsEmpty();
            }
        }
        catch(err){
            this.cartSummary.sendError(err.message);
        }
        
    }
}