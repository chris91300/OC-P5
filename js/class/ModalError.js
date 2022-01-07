

/**
 * @class ModalError
 * extends the Modal class
 * show a error message to the user
 */
class ModalError extends Modal{
    constructor(){
        super();
        
    }


    /**
     * show the expected message
     * @param {string} message the message to show
     */
    showMessage(message = this.message){
        this.text.innerHTML = message;
        super.show();
    }
}