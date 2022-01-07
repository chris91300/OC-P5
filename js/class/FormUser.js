

/**
 * @class FormUser
 * manages the form that the user must complete to validate his cart
 */
class FormUser{

    /**
     * 
     * @param {object} cartSummary an instance of the class CartSummary
     */
    constructor(cartSummary){
        this.cartSummary = cartSummary;
        this.urlPost = "http://localhost:3000/api/products/order";
        this.firstName = undefined;
        this.lastName = undefined;
        this.address = undefined;
        this.city = undefined;
        this.email = undefined;

        this.firstNameIsValid = false;
        this.lastNameIsValid = false;
        this.addressIsValid = false;
        this.cityIsValid = false;
        this.emailIsValid = false;

        this.inputs = {
            "firstName" : {
                regex : /^[a-zA-Z]+([\- ]{1}[a-zA-Z]+)?$/,
                errorMessage : "Votre prénom n'est pas valide."
            },

            "lastName" : {
                regex : /^[a-zA-Z]+([\- ]{1}[a-zA-Z]+)?$/,
                errorMessage : "Votre nom n'est pas valide."
            },

            "address" : {
                regex : /^.*$/,
                errorMessage : "Votre addresse n'est pas valide."
            },

            "city" : {
                regex : /^[a-zA-Z \-]+$/,
                errorMessage : "Votre ville n'est pas valide."
            },

            "email" : {
                regex : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                errorMessage : "Votre email n'est pas valide."}
        }

        this.firstNameInput = document.getElementById("firstName");
        this.lastNameInput = document.getElementById("lastName");
        this.addressInput = document.getElementById("address");
        this.cityInput = document.getElementById("city");
        this.emailInput = document.getElementById("email");
        this.order = document.getElementById("order");

        this.initInputEvent();
        this.initSubmitEvent();
    }


    /**
     * add all event on focus and on blur for inputs
     */
    initInputEvent(){
        let inputs = document.querySelectorAll("form input");
        
        Object.entries(inputs).map( ( [ key, input ] )=>{
            
            let type = input.getAttribute("type");
            if ( type != undefined & type != "submit") {
                
                input.addEventListener("blur", this.checkInput);
                input.addEventListener("focus", this.emptyErrorMessage);
            }
            
        })
    }
    


    /**
     * verify if the input value is valid with is regex
     * if is not valid, show an error message 
     * @param {object} e EVENT object
     */
    checkInput = (e) => {
        let input = e.currentTarget;
        let idElement = input.getAttribute("id");
        let value = input.value;

        if ( value != ""){
            let regexElement = this.inputs[idElement].regex;
            let errorMessage = this.inputs[idElement].errorMessage;
            let variableValue;
            let variableIsValid;

            if ( !regexElement.test(value)) {
                let errorElementID = idElement +"ErrorMsg";
                let errorElement = document.getElementById(errorElementID);

                errorElement.innerHTML = errorMessage;

                variableValue = undefined;
                variableIsValid = false;
            } else {

                variableValue = value;
                variableIsValid = true;

            }

            this.setResultAboutCheck(idElement, variableValue, variableIsValid);
        } else {
            this.setResultAboutCheck(idElement, undefined, false);
        }
        
        
    }


    /**
     * set input value and if it's valid to the good variables
     * 
     * @param {string} id input id
     * @param {string} value input value
     * @param {booleen} isValid if the value is valid or not
     */
    setResultAboutCheck(id, value, isValid){

        switch(id){

            case "firstName":
                this.firstName = value;
                this.firstNameIsValid = isValid;
                break;

            case "lastName":
                this.lastName = value;
                this.lastNameIsValid = isValid;
                break;

            case "address":
                this.address = value;
                this.addressIsValid = isValid;
                break;

            case "city":
                this.city = value;
                this.cityIsValid = isValid;
                break;

            case "email":
                this.email = value;
                this.emailIsValid = isValid;
                break;

            default :
                // nothing
        }
    }



    /**
     * hide the error message of the current input to the focus
     * @param {object} e EVENT object
     */
    emptyErrorMessage = (e) => {
        let input = e.currentTarget;
        let idElement = input.getAttribute("id");
        let errorElementID = idElement +"ErrorMsg";
        let errorElement = document.getElementById(errorElementID);

        errorElement.innerHTML = "";
    }




    /**
     * add to the event listener the callback at the click to submit button
     */
    initSubmitEvent(){
        this.order.addEventListener("click", this.submit);
    }



    /**
     * send form if is valid
     * 
     * @param {object} e EVENT object
     */
    submit = (e) => {
        
        e.preventDefault();
        e.stopImmediatePropagation();

        let cartIsEmpty = this.cartSummary.cartIsEmpty();
        
        if ( cartIsEmpty ){
            this.cartSummary.sendError("Votre panier est vide");
        } else {

            if ( 
                this.firstNameIsValid &&
                this.lastNameIsValid &&
                this.addressIsValid && 
                this.cityIsValid && 
                this.emailIsValid
            ) {
    
                this.sendToServer();
            } else {

                this.cartSummary.sendError("le formulaire n'est pas valide");
               
            }
        }

        

    }



    /**
     * sends the form data and the list of products to the server
     * if is valid, get the orderID (order number)
     * then empties the cart and sends the user to the confirmation page
     */
    async sendToServer() {

        let body = {};
        let contact = {};
        contact.firstName = this.firstName;
        contact.lastName = this.lastName;
        contact.address = this.address;
        contact.city = this.city;
        contact.email = this.email;

        let products = this.cartSummary.getCart();

        body.contact = contact;
        body.products = products;

        let data = {
            method : 'POST',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(body)
        }

        let response = await useFetch(this.urlPost, data);

        let orderId = response.orderId;

        this.cartSummary.clearCart();

        location.href = "confirmation.html?orderId="+orderId;
    }
}