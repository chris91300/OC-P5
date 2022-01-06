

/**
 * @class ModalError
 * hérite de la class Modal
 * permet d'afficher un message de success à l'utilisateur
 */
class ModalSuccess extends Modal{
    constructor(id ="modal-success", message = "Votre produit à bien été ajouté à votre panier.", type = "success"){
        super(id, message, type);
        
        this.addButtons();
        
    }


    /**
     * affiche le message envoyé en paramètre
     * @param {string} message 
     */
    showMessage(message = this.message){
        this.text.innerHTML = message;
        
        super.show();
    }



    /**
     * ajoute les bouttons qui permettent d'aller directement au panier ou de fermer la modal
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