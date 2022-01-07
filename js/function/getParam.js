
/**
 * find and return a parameter into an url
 * 
 * @param {string} url the url in which to look for the requested parameter
 * @param {string} paramToReturn the desired parameter
 * @returns valueToReturn, the parameter value or null if not find
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