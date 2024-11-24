
// set color navbar

var windowInsetsController = WindowCompat.getInsetsController(window, window.decorView)

//For status bar texts/icons color
windowInsetsController.isAppearanceLightStatusBars = true

//For navigation bar icons color
windowInsetsController.isAppearanceLightNavigationBars = true

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











// IntersectionObserver to detect when a section is in view
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    const sectionTitle = entry.target.getAttribute('data-title');
    const backgroundElement = document.querySelector('.backgroundImage');
    
    // If section is in view
    if (entry.isIntersecting) {
      // Add a delay before triggering the scroll behavior
      setTimeout(() => {
        // Update active button in the header
        const buttons = document.querySelectorAll('.headerButtons .btnClass');
        buttons.forEach(button => button.classList.remove('active'));
        
        const activeButton = [...buttons].find(button => button.textContent === sectionTitle);
        if (activeButton) activeButton.classList.add('active');
        
        // Apply blur effect to background based on section title
        if (sectionTitle !== "Hello!") {
          backgroundElement.classList.add('blur'); // Add blur effect
        } else {
          backgroundElement.classList.remove('blur'); // Remove blur effect
        }
      }, 5); // Delay by 5ms for smoother transition
    }
  });
}, { threshold: 0.5 });  // Trigger when 50% of the section is visible

// Observe each section
const sections = document.querySelectorAll('section');
sections.forEach(section => observer.observe(section));


// Carousel-related scroll behavior
let isScrolling = false;
let isAtFirstProject = false;
let isAtLastProject = false;
const carouselContainer = document.querySelector('.verticalCarousel');
const projectItems = document.querySelectorAll('.verticalCarousel .projectItem');

// Detect when scroll reaches the first or last project
carouselContainer.addEventListener('wheel', (e) => {
  if (!isScrolling) return;

  if (e.deltaY > 0) {
    // Scrolling down
    if (isAtLastProject) {
      // Allow scrolling the whole section
      disableCarouselScroll();
    } else {
      // Allow scrolling the carousel
      scrollCarousel('down');
    }
  } else {
    // Scrolling up
    if (isAtFirstProject) {
      // Allow scrolling the whole section
      disableCarouselScroll();
    } else {
      // Allow scrolling the carousel
      scrollCarousel('up');
    }
  }
});

// Enable carousel scrolling and apply blur to the carousel container
function enableCarouselScroll() {
  isScrolling = true;
  updateBoundaryStates();
  applyBlur(true);  // Apply blur effect when carousel is active
}

// Disable carousel scrolling (allow normal page scrolling) and remove blur
function disableCarouselScroll() {
  isScrolling = false;
  updateBoundaryStates();
  applyBlur(false);  // Remove blur effect when carousel is not active
}

// Scroll the carousel (up or down)
function scrollCarousel(direction) {
  const currentProject = document.querySelector('.verticalCarousel .projectItem.active');
  let nextProject;

  if (direction === 'down') {
    nextProject = currentProject?.nextElementSibling || projectItems[projectItems.length - 1];
  } else if (direction === 'up') {
    nextProject = currentProject?.previousElementSibling || projectItems[0];
  }

  if (nextProject) {
    currentProject?.classList.remove('active');
    nextProject.classList.add('active');
    nextProject.scrollIntoView({ behavior: 'smooth' });
    updateBoundaryStates();
  }
}

// Update boundary states (first/last project)
function updateBoundaryStates() {
  const firstProject = projectItems[0];
  const lastProject = projectItems[projectItems.length - 1];
  const currentProject = document.querySelector('.verticalCarousel .projectItem.active');

  isAtFirstProject = currentProject === firstProject;
  isAtLastProject = currentProject === lastProject;
}

// Apply or remove blur effect on the carousel container
function applyBlur(enable) {
  if (enable) {
    carouselContainer.style.filter = 'blur(8px)';  // Apply blur effect
  } else {
    carouselContainer.style.filter = '';  // Remove blur effect
  }
}