import {getFromStorage} from './storage';

export default function checkLogin(){
    
    let token = getFromStorage("x-auth-token");
    
    if (token == null){
        
        return token;
    }else{
        
        return token;
    }
}


