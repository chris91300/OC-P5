

/**
 * @class Order
 * get the orderId into the url page and insert into the DOM
 */
class Order{

    constructor(){

        this.orderIdElement = document.getElementById("orderId");

        this.sendOrderId();
    }


    /**
     * get the orderId into the url page and insert into the DOM
     */
    sendOrderId(){

        let url = location.href;
        let orderId = getParam(url, 'orderId');
        this.orderIdElement.innerHTML = orderId;
        
    }


}