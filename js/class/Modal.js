
class Modal{

    constructor(message = "Une erreur est survenue."){
        this.message = message;        

        this.init();
    }

    init(){
        let body = document.body;

        let modal = createElement({
            parent : body,
            action : "appendChild",
            typeElement : "div",
            classElement : "modal"
        });    

        let modalContainer = createElement({
            parent : modal,
            action : "appendChild",
            typeElement : "div",
            classElement : "modal__container"
        });

        let buttonHide = createElement({
            parent : modalContainer,
            action : "appendChild",
            typeElement : "button",
            classElement : "modal__button--hide",
            text : "X"
        });
        

    }
}