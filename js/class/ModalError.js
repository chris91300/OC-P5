

/**
 * @class ModalError
 * hérite de la class Modal
 * permet d'afficher un message d'erreur à l'utilisateur
 */
class ModalError extends Modal{
    constructor(){
        super();
        
    }


    showMessage(message = this.message){
        this.text.innerHTML = message;
        super.show();
    }
}