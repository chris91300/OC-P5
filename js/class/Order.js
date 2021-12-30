



class Order{

    constructor(){

        this.orderIdElement = document.getElementById("orderId");

        this.sendOrderId();
        this.clearCart();
    }


    sendOrderId(){

        let url = location.href;
        let orderId = getParam(url, 'orderId');
        this.orderIdElement.innerHTML = orderId;
        
    }


    clearCart(){


    }
}