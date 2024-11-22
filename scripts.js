
window.onload=timedOutNameChange;
let wordIterator;

const targetNames = ["Neeklo", "Niccoló Fioritti", "Nico"]
let targetNameIndex = 1;


function timedOutNameChange(){
  setTimeout(()=>{ wordIterator = setInterval((randomizeName),10);},2000);

}




function randomizeName(){

  console.log("RANDOMSZ");
  let name = document.getElementById('titleName');
  
  if( name.innerHTML === targetNames[targetNameIndex]){
    console.log("ASD");
    clearInterval(wordIterator);
    // targetNameIndex= (targetNameIndex+1)%3;
    // timedOutNameChange();
  }
  
  
  name.innerHTML=randomz(name);
 

}




function randomz(elementToRandomize){

 
  let oldStr = elementToRandomize.innerHTML;
  let name = targetNames[targetNameIndex];
  let str = iterateUntilTargetCharacter(oldStr,name);

  return str;
}


function iterateUntilTargetCharacter(currentString,targetString){



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
    if(currentString == targetString){
      

      // clearInterval(wordIterator);
      // timedOutNameChange();
      // return;
  
    }
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

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Apply the mask transition when the section is visible
      const blurOverlay = document.querySelector('.blurOverlay');
      const backgroundImage = document.querySelector('.backgroundImage');
      
      // Add active class to header button
      const sectionTitle = entry.target.getAttribute('data-title');
      const buttons = document.querySelectorAll('.headerButtons .btnClass');
  
        if(sectionTitle != "Hello!"){
  
          // blurOverlay.classList.add('transitionMask'); // Add the transition class
           backgroundImage.classList.add('transitionMask'); // Add the transition class
        }
        else{
          // blurOverlay.classList.remove('transitionMask'); // Add the transition class
          backgroundImage.classList.remove('transitionMask'); // Add the transition class
          
        }
      
      buttons.forEach(button => button.classList.remove('active'));
      
      const activeButton = [...buttons].find(button => button.textContent === sectionTitle);
      if (activeButton) activeButton.classList.add('active');
    }
  });
}, { threshold: 0.5 });

const sections = document.querySelectorAll('section');
sections.forEach(section => observer.observe(section));



