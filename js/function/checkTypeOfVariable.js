

/**
 * Vérifie si le type de la variable correspond au type envoyé en paramètre
 * @param {*} variable 
 * @param {string} type 
 * @param {string} message 
 */

function checkTypeOfVariable(variable, type, message){

    if ( typeof variable != type) {
        throw new Error(message);
    }
}