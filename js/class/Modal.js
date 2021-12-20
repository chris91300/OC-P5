
class Modal{

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
        /*console.log("this.hide()");
        console.log(this.hide())*/
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