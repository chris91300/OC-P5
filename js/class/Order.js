


/**
 * @class Order
 * récupère et affiche l'orderId ( numéro de commande )
 */
class Order{

    constructor(){

        this.orderIdElement = document.getElementById("orderId");

        this.sendOrderId();
    }


    /**
     * récupère et affiche l'orderId ( numéro de commande )
     */
    sendOrderId(){

        let url = location.href;
        let orderId = getParam(url, 'orderId');
        this.orderIdElement.innerHTML = orderId;
        
    }


}