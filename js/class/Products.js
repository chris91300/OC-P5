
/**
 * @class Products
 * 
 * ask all products to the server and set data to Product class
 * 
 */
class Products{

    constructor(){
        this.modalError = new ModalError();
        this.products;
        this.urlProducts = "http://localhost:3000/api/products";
        this.productsContainer = document.getElementById("items");

        this.init();
    }


    /**
     * products recovery
     * send each data product to the Product class
     */
    async init(){
        try{

            //  create et insertion d'un loading 
            let loading = createElement({
                parent : this.productsContainer,
                action : "appendChild",
                typeElement : "div",
                attributes : { "id" : "loading"}
            })

            this.products = await useFetch(this.urlProducts);

            //  suppression du loading
            this.productsContainer.removeChild(loading);
            
            this.products.map((product)=>{
                new Product(this, this.productsContainer, product);
            })

        }
        catch(err){
            
            this.sendMessage(err.message);
        }
        
    }



    /**
     * send the error message to the modalError
     * @param {string} message the message to show
     */
    sendMessage(message){
        this.modalError.showMessage(message);
    }
}