
/**
 * function who use the js function fetch in order to simplify the system async / await
 * @param {string} url 
 * @returns an object 
 */
async function useFetch(url){

    try{
        let response = await fetch(url);

        if ( !response.ok ){
            throw new Error("response pas ok dans useFetch");
        }

        let json = await response.json();

        return json;
    }
    catch(err){
        console.log(err);
    }
    
    
}








