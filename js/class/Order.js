

/**
 * @class Order
 * get the orderId into the url page and insert into the DOM
 */
class Order{

    constructor(){

        this.orderIdElement = document.getElementById("orderId");
        this.regexOrder = /^[a-zA-Z0-9]{8}(-[a-zA-Z0-9]{4}){3}-[a-zA-Z0-9]{12}$/
        this.sendOrderId();
    }


    /**
     * get the orderId into the url page and insert into the DOM
     */
    sendOrderId(){
        
        try {
            let url = location.href;
            let orderId = getParam(url, 'orderId');  

            if (!orderId || !this.regexOrder.test(orderId)){
                throw new Error();
            }    

            this.orderIdElement.innerHTML = orderId;
            
        } catch (err){
            
            location.href="./index.html";
        }
        
        
        
    }


}