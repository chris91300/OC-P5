

/**
 * @class ModalError
 * hérite de la class Modal
 * permet d'afficher un message de success à l'utilisateur
 */
class ModalSuccess extends Modal{
    constructor(id ="modal-success", message = "Votre produit à bien été ajouté à votre panier.", type = "success"){
        super(id, message, type);
        
    }


    showMessage(message = this.message){
        this.text.innerHTML = message;
        super.show();
    }
}