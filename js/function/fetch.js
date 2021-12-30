
/**
 * function who use the js function fetch in order to simplify the system async / await
 * @param {string} url 
 * @returns an object 
 */
async function useFetch(url, options=null){
    
    checkTypeOfVariable(url, "string", "l'url n'est pas de type string");
    
    let response = await fetch(url, options);

    if ( !response.ok ){
        throw new Error("Une erreur de serveur est survenu. Merci de recharger la page.");
    }

    let json = await response.json();

    return json;
    
    
    
}








