

/**
 * Vérifie si le type de a variable correspond au type envoyé en paramètre
 * @param {*} variable 
 * @param {string} type 
 * @param {string} message 
 */

function checkTypeOfVariable(variable, type, message){

    if ( typeof variable != type) {
        throw new Error(message);
    }
}