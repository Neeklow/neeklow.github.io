
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






// Create an intersection observer
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // Check if the section is sufficiently visible (50% in view)
    if (entry.isIntersecting) {
      // Get the data-title attribute of the currently visible section
      const sectionTitle = entry.target.getAttribute('data-title');
      
      // Select all buttons
      const buttons = document.querySelectorAll('.headerButtons .btnClass');
      
      // Remove any previous active highlights
      buttons.forEach(button => {
        button.classList.remove('active');
      });
      
      // Find the button that corresponds to the visible section
      const activeButton = [...buttons].find(button => button.textContent === sectionTitle);
      
      // Add the 'active' class to the button to highlight it
      if (activeButton) {
        activeButton.classList.add('active');
      }
    }
  });
}, { threshold: 0.5 });  // Only triggers when at least 50% of the section is visible

// Select all sections
const sections = document.querySelectorAll('section');

// Start observing each section
sections.forEach(section => {
  observer.observe(section);
});

// Add event listeners to buttons for smooth scrolling
const buttons = document.querySelectorAll('.headerButtons .btnClass');
buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault();  // Prevent default button behavior

    // Find the section that corresponds to the button
    const sectionTitle = button.textContent;  // Get the button text
    const section = [...sections].find(section => section.getAttribute('data-title') === sectionTitle);

    // If the corresponding section exists, scroll to it smoothly
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'  // Scroll to the top of the section
      });
    }
  });
});