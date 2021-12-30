

/**
 * @class Product
 * 
 * class représentant un produit Kanap
 * Elle créer le produit et l'insert dans son container
 * 
 */
class Product{

    /**
     * 
     * @param {object} container le container dans lequel insérer l'élément
     * @param {string} AltTxt le texte alternatif de l'image ( attribut )
     * @param {array} colors le choix de couleur possible pour le canapé
     * @param {string} description la description du produit
     * @param {string} imageUrl l'url de l'image à afficher ( image du canapé )
     * @param {string} name le nom du produit
     * @param {number} price le prix du produit
     * @param {string} _id l'identifiant du produit
     */
    constructor( container, { altTxt, colors, description, imageUrl, name, price, _id }){
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
     *  création et insertion du produit dans la page avec les données correspondantes
     */
    init(){
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
}