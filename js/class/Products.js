
/**
 * @class Products
 * class qui demande au serveur la liste des produits et les insert dans la page
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
     * récupèration des produits et envois les informations de chaque prouit à la class Product
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
                new Product(this.productsContainer, product);
            })

        }
        catch(err){
            
            this.modalError.showMessage(err.message);
        }
        
    }
}