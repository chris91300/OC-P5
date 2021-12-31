


class CartSummaryProduct{

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
     * creation du produit et insertion dans le DOM
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
     * creation de la partie image du produit
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
     * creation de la partie content du produit
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
     * creation de la partie conent description du produit
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
     * creation de la partie content settings du produit
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
     * creation de la partie conent settings quantité du produit
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
     * creation de la partie content settings delete du produit
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
     * modification de la quantité de d'article au changement de la quantité de produit
     */
    quantityChanged = (e) => {
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



    /**
     * supprime le produit du panier
     */
    removeProduct = () => {
        
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
}