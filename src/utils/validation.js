export function twoWordMax(input) {
    let bool = false;
    let wordCount = 0;
    let arr = input.split(" ");
    for (let i = 0; i <= arr.length; i++) {
      wordCount += 1;
    }
    if (wordCount === 2) {
      bool = true;
    }

    return bool;
  }
  
  export  function inputFormat(input) {
    let bool = false;
    let numCount = 0;
    let capCount = 0;
    for (let i = 0; i <= input.length; i++) {
      if (input.includes(input.toUpperCase().charAt(i))) {
        for (let j = 0; j < 10; j++) {
          if (input.charAt(i).includes(j)) {
            capCount -= 1;
          }
        }
        capCount += 1;
      }
      for (let j = 0; j < 10; j++) {
        if (input.charAt(i).includes(j)) {
          numCount += 1;
        }
      }
    }
    if (numCount >= 3 && capCount >= 2) {
      bool = true;
    }
    return bool;
  }
  
  export function dateCheck(input) {
    var dateRegExpression = /^\d{4}-\d{2}-\d{2}$/;
    return input.match(dateRegExpression) != null;
  }

  export function checkAt(input){
    var emailRegExpression = /\S+@\S+\.\S+/;
    return emailRegExpression.test(input);
  }

  export function integerCheck(input){
      if (Number.isInteger(parseInt(input))){
          return true;
      }else{
          return false;
      }
  }

  export function tfTimeCheck(input){
    var timeRegExpression = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeRegExpression.test(input);
  }