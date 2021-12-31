
/**
 * fonction qui cherche un paramètre précis dans une url et le renvoi si elle l'a trouvé, 
 * sinon renvoi 
 * 
 * @param {string} url l'url dans laquelle il faut chercher le paramètre demandé
 * @param {string} paramToReturn le paramètre demandé
 * @returns valueToReturn, la valeur du paramètre démandé si trouvé sinon null
 */
function getParam(url, paramToReturn){

    checkTypeOfVariable(url, "string", "impossible de récupérer un paramètre. l'url n'est pas valable");
    checkTypeOfVariable(paramToReturn, "string", "impossible de créer l'élement. le paramètre à rechercher n'est pas valable");
    url = url.split("?")[1];
    let valueToReturn = null;
    let searchParams = new URLSearchParams(url)
    
    valueToReturn = searchParams.get(paramToReturn);
    
    return valueToReturn;

}