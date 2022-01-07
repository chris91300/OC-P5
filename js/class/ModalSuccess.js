

/**
 * @class ModalError
 * extends the Modal class
 * show a success message to the user
 */
class ModalSuccess extends Modal{

    /**
     * 
     * @param {string} id the modal id
     * @param {string} message the message to show by default
     * @param {string} type the type of the modal
     */
    constructor(id ="modal-success", message = "Votre produit à bien été ajouté à votre panier.", type = "success"){
        super(id, message, type);
        
        this.addButtons();
        
    }


    /**
     * show the expected message
     * @param {string} message the message to show
     */
    showMessage(message = this.message){
        this.text.innerHTML = message;
        
        super.show();
    }



    /** 
     * add buttons in order to go to the cart page or close the modal
     */
    addButtons(){
        let modalContainer = document.querySelector("#modal-success div");

        let buttonsContainer = createElement({
            parent : modalContainer,
            action : "appendChild",
            typeElement : "div",
            classElement : "modal__container__buttons"
        })

        let buttonCart = createElement({
            parent : buttonsContainer,
            action : "appendChild",
            typeElement : "button",
            classElement : "modal__button",
            text : "voir mon panier"
        })

        let buttonClose = createElement({
            parent : buttonsContainer,
            action : "appendChild",
            typeElement : "button",
            classElement : "modal__button",
            text : "fermer"
        })


        buttonCart.addEventListener("click", this.goToCartPage);
        buttonClose.addEventListener("click", this.hide);

    }


    /**
     * go to the cart page
     */
    goToCartPage(){
        
        location.href = "cart.html";
    }
}