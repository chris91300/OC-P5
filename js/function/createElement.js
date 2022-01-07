
/**
 * function for create an element and insert him into the dom * 
 * 
 * @param {object} data list of the data of the element you want to create
 * 
 * data.parent : { DOM object } node where the function have to insert the new element
 * data.action : { string }have to be "appendChild", "insertBefore", insertAfter"
 * data.typeElement : { string } : type of the element (div, a, h1 ...)
 * data.classElement : { sting } all the class of the element (ex : "class1 class2 class3 ...");
 * data.attributes : { object } : list of the attributes of the element
 * data.text : { string } : the text to insert into the element
 * data.eventElement : { string } the type of event to add to Object Event
 * data.callback : { function } the callback to add to Object Event
 * 
 * @return {object} element. the DOM element
 */

function createElement(data){
   
        
        checkTypeOfVariable(data, "object", "impossible de créer l'élement. data doit être de type 'object'");
       
        
        if ( data.parent == undefined || typeof(data.parent) != "object" ){
            throw new Error("impossible de créer l'élement. L'élément doit avoir un parent");
        }

        if ( data.action == undefined || typeof(data.action) != "string" ){
            throw new Error("impossible de créer l'élement. Je ne sais pas quoi faire de cette element");
        }

        if ( data.typeElement == undefined || typeof(data.typeElement) != "string" ){
            throw new Error("impossible de créer l'élement. Je ne connais pas son type");
        }
        
        if ( data.classElement != undefined & typeof(data.classElement) != "string" ){
            throw new Error("impossible de créer l'élement. data classElement n'est pas un string");
        }

    
        if ( data.attributes != undefined & typeof(data.attributes) != "object" ){
           
            throw new Error("impossible de créer l'élement. data attributes n'est pas un object");
        }

        if ( data.text != undefined & typeof(data.text) != "string" ){
            throw new Error("impossible de créer l'élement. data text n'est pas un string");
        }

        let { parent, typeElement, action, classElement, attributes, text, eventElement, callback } = data;

        let element = document.createElement(typeElement);

        /** if classElement is define add it  */
        if ( classElement ) {
            element.className = classElement;
        }

        /** if attributes is define add them */
        if ( attributes ) {
            Object.entries(attributes).map( ( [ attribute, value ] )=>{

                if ( attribute == undefined || typeof(attribute) != "string" ){
                    throw new Error("impossible de créer l'élement. un des attributs n'est pas un string");
                }

                element.setAttribute(attribute, value);
            })
        }

        /** if text is define add it */
        if ( text ){
            element.innerHTML = text;
        }


        /** insert element into his container with appendChild or insertBefore or insertAfter */
        switch(action){

            case "appendChild" :
                parent.appendChild(element);
                break;

            case "insertBefore" :
                parent.insertBefore(element);
                break;

            case "insertAfter" :
                parent.insertAfter(element);
                break;

            default:
                throw new Error("impossible de créer l'élement. Aucun action ne correspond.")
        }

        
        /** add a callback to the eventlistener if there is one */
        if ( eventElement != undefined & callback != undefined ) {
            element.addEventListener(eventElement, callback);
        }


        return element;

    
}