


class ModalError extends Modal{
    constructor(){
        super();
        
    }


    showMessage(message){
        this.text.innerHTML = message;
        super.show();
    }
}