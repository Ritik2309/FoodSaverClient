export function getFromStorage(key) {
    if (!key) {
      return console.log('No key found, check login!');
    }
    try {
      const valueStr = localStorage.getItem(key);
        if (valueStr) {
        return JSON.parse(valueStr);
      }
      return null;
    } catch (err) {
      return  console.log('could not retrieve key from local storage!');;
    }
  }
  export function setInStorage(key, obj) {
    if (!key) {
      console.error('Error: Key is missing');
    }
    try {
      localStorage.setItem(key, JSON.stringify(obj));
    } catch (err) {
      console.error(err);
    }
  }
  export function deleteFromStorage(key){
    if (!key){
      return null;
    }
    try {
      const valueStr = localStorage.getItem(key);
        if (valueStr) {
          localStorage.setItem(key, JSON.stringify(null));
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  export function getLocation(key) {
    
    try {
      const valueStr = localStorage.getItem(key);
        if (valueStr) {
        return JSON.parse(valueStr);
      }
      
    } catch (err) {
      return null;
    }
  }
  export function setLocationStorage(obj) {
    
    try {
      localStorage.setItem("location", JSON.stringify(obj));
    } catch (err) {
      console.error(err);
    }
  }

  export function getImage(key) {
    
    try {
      const valueStr = localStorage.getItem(key);
        if (valueStr) {
        return JSON.parse(valueStr);
      }
      
    } catch (err) {
      return null;
    }
  }
  export function setImageStorage(obj) {
    
    try {
      localStorage.setItem("image", JSON.stringify(obj));
    } catch (err) {
      console.error(err);
    }
  }