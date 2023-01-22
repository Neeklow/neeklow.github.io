
window.onload=timedOutNameChange;


function timedOutNameChange(){
  setTimeout(randomizeName,2000);
  // setInterval(randomizeName,10);
}


function randomizeName(){
  let name = document.getElementById('titleName');
  console.log(name);


  string = replaceCharacter("Neeklo");
  name.innerHTML =string;


// setInterval(randomizeName,10);


}



function iterateUntilTargetCharacter(targetString){
  let arrayLenght = targetString.length;
    for(let i=0; i< arrayLenght; i++){
      


    }
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
  
 
  return letter;
}


