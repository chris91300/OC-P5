

/**
 * @class Modal
 * show a message tot the user
 */
class Modal{

    /**
     * 
     * @param {string} id the modal id
     * @param {string} message the message to show by default
     * @param {string} type the type of the modal children (alert or success)
     */
    constructor(id ="modal-error", message = "Une erreur est survenue.", type = "alert"){
        this.id = id;
        this.message = message;   
        this.type = type;     
        this.modal;
        this.modalContainer; 
        this.buttonHide;
        this.text;

        this.init();
    }

    /**
     * Create the modal and insert her into the body
     */
    init(){
        let body = document.body;
        
        this.modal = createElement({
            parent : body,
            action : "appendChild",
            typeElement : "div",
            classElement : "modal",
            attributes : {"id" : this.id}
        });    

        this.modalContainer = createElement({
            parent : this.modal,
            action : "appendChild",
            typeElement : "div",
            classElement : "modal__container modal__container--"+this.type
        });

        this.buttonHide = createElement({
            parent : this.modalContainer,
            action : "appendChild",
            typeElement : "button",
            classElement : "modal__button--hide",
            text : "X",
            eventElement : "click",
            callback : this.hide
        });

        this.text = createElement({
            parent : this.modalContainer,
            action : "appendChild",
            typeElement : "p",
            classElement : "modal__text"
        });
        

        

    }

    /**
     * show the expected message
     * @param {string} message the message to show
     */
     showMessage(message = this.message){
        this.text.innerHTML = message;
        this.show();
    }



    /** show the modal */
    show(){
        this.modal.classList.add("show");
    }


    /**
     * hide the modal when user click on the buttonHide
     */
    hide = ()=>{
        this.modal.classList.remove("show");
    }

}