

/**
 * verify if the type of the variable if valid
 * else throw new Error
 * 
 * @param {*} variable the variable to check
 * @param {string} type the expected type 
 * @param {string} message the error message
 */

function checkTypeOfVariable(variable, type, message){

    if ( typeof variable != type) {
        throw new Error(message);
    }
}