

/**
 * @class Product
 * 
 * Represent one product card
 * 
 */
class Product{

    /**
     * 
     * @param {object} container the container in which to insert the element
     * @param {string} AltTxt the alternative text of the image ( attribute )
     * @param {array} colors the possible colors choice for the product
     * @param {string} description the product description
     * @param {string} imageUrl the url of the image to display
     * @param {string} name the product name
     * @param {number} price the product price
     * @param {string} _id the product id
     */
    constructor( products, container, { altTxt, colors, description, imageUrl, name, price, _id }){
        this.products = products;
        this.container = container;
        this.altTxt = altTxt;
        this.colors = colors;
        this.description = description;
        this.imageUrl = imageUrl;
        this.name = name;
        this.price = price;
        this.id = _id;
        this.linkToPage = "./product.html?id="+this.id;

        this.init();
    }


    /**
     * create and insert into the DOM the product card
     */
    init(){

        try{

            let productContainer = createElement({
                parent : this.container,
                action : "appendChild",
                typeElement : "a",
                attributes : { "href" : this.linkToPage}
            });
    
            let article = createElement({
                parent : productContainer,
                action : "appendChild",
                typeElement : "article",
            });
    
            let image = createElement({
                parent : article,
                action : "appendChild",
                typeElement : "img",
                attributes : { 
                    "src" : this.imageUrl,
                    "alt" : this.altTxt
                    }
            });
    
            let title = createElement({
                parent : article,
                action : "appendChild",
                typeElement : "h3",
                classElement : "productName",
                text : this.name
            });
    
            let description = createElement({
                parent: article,
                action : "appendChild",
                typeElement : "p",
                classElement : "productDescription",
                text : this.description
            });

        }
        catch(err){

            this.products.sendMessage(err.message);
            
        }

    }
}