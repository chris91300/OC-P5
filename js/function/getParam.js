
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
    
    let paramFinded = false;
    let valueToReturn = null;
    let params = url.split("?")[1];
    let listOfParams = params.split("&");


    listOfParams.map((parameter)=>{
        let [ param, value ] = parameter.split("=");
        if ( paramToReturn === param ){
            paramFinded = true
            valueToReturn = value;
        }
    })

    if ( !paramFinded ) {
        
        throw new Error("aucun paramètre ne correspond au paramètre demandé");        
    }     

    return valueToReturn;

}