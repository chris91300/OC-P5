

window.onload = async ()=>{
    console.log("c'est parti ma poule");
    let modalError = new ModalError();


    /**
     * utilisation de fetch sans async / await
     */
    /*fetch("http://localhost:3000/api/products")
    .then((response)=>{
        response.json()
        .then((products)=>{
            console.log(products);
        })
    })*/


    let products = await useFetch("http://localhost:3000/api/products");
    console.log(products);
};