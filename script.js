
window.onload=timedOutNameChange;
let wordIterator;

function timedOutNameChange(){
  setTimeout(randomizeName,2000);
  
}


function randomizeName(){
  let name = document.getElementById('titleName');
  
  name.innerHTML=randomz(name);
wordIterator = setInterval(randomizeName,50);

}




function randomz(elementToRandomize){

  let oldStr = elementToRandomize.innerHTML;
  let str = iterateUntilTargetCharacter(oldStr,"Niccoló Fioritti");

  return str;
}


function iterateUntilTargetCharacter(currentString,targetString){

  
  console.log("ITER");
    if(currentString == targetString){
      clearInterval(wordIterator);
    }
  let arrayLenght = targetString.length;
  arr=[];
    for(let i=0; i< arrayLenght; i++){
      
      if(currentString[i]!=targetString[i]){
        let isCapital = (targetString.charAt(i) == targetString.charAt(i).toUpperCase());
        arr.push(getRandomLetter(isCapital));
      }else{

        arr.push(currentString[i]);
      }

    
    }


    let string = arr.join("");
    return string;
}



function replaceCharacter(targetString){
  let arrayLenght = targetString.length;
  console.log(arrayLenght);

  let arr =[];
  for(let i=0; i< arrayLenght; i++){

    let isCapital = (targetString.charAt(i) == targetString.charAt(i).toUpperCase());
    console.log(isCapital);
      arr.push(getRandomLetter(isCapital));
   
  }

 let string = arr.join("");
  // return arr.toString();
  return string;

}


function getRandomLetter(isCapital){
let letter = 0;
  if(isCapital){

     letter = String.fromCharCode(65+Math.floor(Math.random() * 26));
  }
  else{
     letter =String.fromCharCode(97+Math.floor(Math.random() * 26));
  }


  let p = Math.random();
  if(p<0.1){
    letter = "ó"
  }
  if(p>0.66){

    letter = " ";
  }

  return letter;
}


