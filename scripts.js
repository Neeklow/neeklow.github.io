// Name animation variables
let wordIterator;
const targetNames = ["Neeklo", "Niccoló Fioritti", "Nico"];
let targetNameIndex = 1;

// DOM Elements
const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const revealElements = document.querySelectorAll('.reveal-element');
const currentYearElement = document.getElementById('current-year');

// Initialize on document load
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  currentYearElement.textContent = new Date().getFullYear();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize navigation
  initNavigation();
  
  // Initialize form
  initContactForm();
  
  // Initialize parallax effect
  initParallaxEffect();
});

// Main initialization function
function initializeAnimations() {
  // Start name animation after a delay
  setTimeout(() => {
    wordIterator = setInterval(randomizeName, 10);
  }, 1500);

  // Add smooth fade-in animation to sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  });

  // Add animations to CV sections
  const cvSections = document.querySelectorAll('.cv-section');
  cvSections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = `opacity 0.5s ease ${0.3 + index * 0.1}s, transform 0.5s ease ${0.3 + index * 0.1}s`;
  });

  // Trigger initial animations
  requestAnimationFrame(() => {
    sections.forEach(section => {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    });
  });
  
  // Initialize vertical carousel
  initializeCarousel();
}

// Setup navigation and scroll behavior
function setupNavigation() {
  document.querySelectorAll('.headerButtons .btnClass').forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const sectionTitle = button.textContent;
      const section = document.querySelector(`section[data-title="${sectionTitle}"]`);
      
      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Set up Intersection Observer for sections
function setupSectionObservers() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        const sectionTitle = section.getAttribute('data-title');
        updateActiveButton(sectionTitle);
        animateSectionElements(section);
      }
    });
  }, { 
    threshold: 0.3,
    rootMargin: '-50px'
  });

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}

// Update active navigation button
function updateActiveButton(sectionTitle) {
  const buttons = document.querySelectorAll('.headerButtons .btnClass');
  buttons.forEach(button => {
    button.classList.remove('active');
    if (button.textContent === sectionTitle) {
      button.classList.add('active');
    }
  });
}

// Animate elements within a section
function animateSectionElements(section) {
  // Add fade-in animation to section
  section.style.opacity = '1';
  section.style.transform = 'translateY(0)';
  
  // Animate CV sections when in view
  if (section.id === 'page-2') {
    const cvSections = document.querySelectorAll('.cv-section');
    cvSections.forEach(cvSection => {
      cvSection.style.opacity = '1';
      cvSection.style.transform = 'translateY(0)';
    });
  }
  
  // Reset carousel when projects section is in view
  if (section.id === 'page-3') {
    scrollToPanel(0);
  }
}

// Name animation functions
function randomizeName() {
  const name = document.getElementById('titleName');
  
  if (name.innerHTML === targetNames[targetNameIndex]) {
    clearInterval(wordIterator);
    setTimeout(() => {
      targetNameIndex = (targetNameIndex + 1) % targetNames.length;
      wordIterator = setInterval(randomizeName, 10);
    }, 2000);
  }
  
  name.innerHTML = randomizeString(name.innerHTML);
}

function randomizeString(currentString) {
  const targetString = targetNames[targetNameIndex];
  return iterateUntilTargetCharacter(currentString, targetString);
}

function iterateUntilTargetCharacter(currentString, targetString) {
  const arrayLength = targetString.length;
  const arr = [];
  
  for (let i = 0; i < arrayLength; i++) {
    if (currentString[i] !== targetString[i]) {
      const isCapital = targetString.charAt(i) === targetString.charAt(i).toUpperCase();
      arr.push(getRandomLetter(isCapital));
    } else {
      arr.push(currentString[i]);
    }
  }
  
  return arr.join("");
}

function getRandomLetter(isCapital) {
  let letter;
  if (isCapital) {
    letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  } else {
    letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
  }

  const p = Math.random();
  if (p < 0.1) {
    letter = "ó";
  }
  if (p > 0.66) {
    letter = " ";
  }

  return letter;
}

// Vertical Carousel functionality
let currentIndex = 0;
let isScrolling = false;
let projectItems, previewItems, carousel, carouselDots;

function initializeCarousel() {
  projectItems = document.querySelectorAll('.projectItem');
  previewItems = document.querySelectorAll('.preview-item');
  carousel = document.querySelector('.verticalCarousel');
  carouselDots = document.querySelectorAll('.carousel-dot');
  
  // Initialize carousel as scrollable
  if (!carousel) return;
  
  carousel.style.overflowY = 'auto';
  carousel.style.scrollBehavior = 'smooth';
  
  // Setup preview item clicks
  previewItems.forEach(preview => {
    preview.addEventListener('click', () => {
      const index = parseInt(preview.getAttribute('data-index'));
      if (!isScrolling && currentIndex !== index) {
        scrollToPanel(index);
      }
    });
  });
  
  // Setup navigation dot clicks
  carouselDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'));
      if (!isScrolling && currentIndex !== index) {
        scrollToPanel(index);
      }
    });
  });
  
  // Handle scroll events on the carousel
  carousel.addEventListener('scroll', handleCarouselScroll);
  
  // Handle wheel events for smooth panel navigation
  carousel.addEventListener('wheel', handleWheelEvent, { passive: false });
  
  // Handle keyboard navigation
  document.addEventListener('keydown', handleKeyboardNavigation);
  
  // Auto-select first item on page load
  if (projectItems.length > 0) {
    setTimeout(() => scrollToPanel(0), 300);
  }
}

// Function to scroll to a specific panel
function scrollToPanel(index) {
  if (!carousel || !projectItems[index]) return;
  
  isScrolling = true;
  
  // Update active dot
  carouselDots.forEach(dot => {
    dot.classList.remove('active');
  });
  carouselDots[index].classList.add('active');
  
  // Update active preview
  previewItems.forEach(preview => {
    preview.classList.remove('active');
  });
  previewItems[index].classList.add('active');
  
  // Ensure active preview is visible in the sidebar
  if (window.innerWidth > 768) {
    // Vertical scrolling on desktop
    previewItems[index].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  } else {
    // Horizontal scrolling on mobile
    previewItems[index].scrollIntoView({
      behavior: 'smooth',
      inline: 'nearest'
    });
  }
  
  // Scroll to the panel
  projectItems[index].scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
  
  // Update current index
  currentIndex = index;
  
  // Update active state on project items
  projectItems.forEach((item, i) => {
    if (i === index) {
      item.classList.add('active');
      enhanceActiveItemVisibility(item);
    } else {
      item.classList.remove('active');
      resetItemVisibility(item);
    }
  });
  
  // Reset scrolling flag after animation completes
  setTimeout(() => {
    isScrolling = false;
  }, 600);
}

// Apply professional highlighting to active elements
function enhanceActiveItemVisibility(item) {
  // Add subtle highlight to active item
  item.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(64, 85, 200, 0.3)';
  item.style.borderColor = 'rgba(64, 85, 200, 0.2)';
  
  // Ensure overlay is visible with enhanced contrast
  const overlay = item.querySelector('.projectOverlay');
  if (overlay) {
    overlay.style.background = 'linear-gradient(to top, rgba(8, 10, 22, 0.95) 0%, rgba(8, 10, 22, 0.8) 30%, rgba(8, 10, 22, 0.4) 60%, rgba(8, 10, 22, 0.1) 85%, transparent 100%)';
    
    const title = overlay.querySelector('h3');
    const description = overlay.querySelector('p');
    const viewBtn = overlay.querySelector('.viewProject');
    
    if (title) title.style.opacity = '1';
    if (description) description.style.opacity = '1';
    if (viewBtn) viewBtn.style.opacity = '1';
  }
}

// Reset item styling when not active
function resetItemVisibility(item) {
  item.style.boxShadow = '';
  item.style.borderColor = '';
  
  const overlay = item.querySelector('.projectOverlay');
  if (overlay) {
    overlay.style.background = '';
  }
}

// Handle carousel scroll events
function handleCarouselScroll() {
  if (isScrolling) return;
  
  // Find which panel is most visible
  let closestItem = null;
  let closestDistance = Infinity;
  
  projectItems.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    const carouselRect = carousel.getBoundingClientRect();
    
    // Calculate distance from item to viewport center
    const distance = Math.abs(rect.top - carouselRect.top);
    
    if (distance < closestDistance) {
      closestDistance = distance;
      closestItem = item;
    }
  });
  
  if (closestItem) {
    const newIndex = parseInt(closestItem.getAttribute('data-index'));
    
    if (newIndex !== currentIndex) {
      // Update current index
      currentIndex = newIndex;
      
      // Update active states
      projectItems.forEach((item, i) => {
        if (i === currentIndex) {
          item.classList.add('active');
          enhanceActiveItemVisibility(item);
        } else {
          item.classList.remove('active');
          resetItemVisibility(item);
        }
      });
      
      // Update navigation dots
      carouselDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
      
      // Update preview items
      previewItems.forEach((preview, i) => {
        preview.classList.toggle('active', i === currentIndex);
      });
    }
  }
}

// Handle wheel events for smooth panel navigation
function handleWheelEvent(e) {
  e.preventDefault();
  
  if (isScrolling) return;
  
  // Determine scroll direction
  const direction = e.deltaY > 0 ? 1 : -1;
  const newIndex = Math.max(0, Math.min(projectItems.length - 1, currentIndex + direction));
  
  if (newIndex !== currentIndex) {
    scrollToPanel(newIndex);
  }
}

// Handle keyboard navigation
function handleKeyboardNavigation(e) {
  const projectsSection = document.getElementById('page-3');
  if (!projectsSection || projectsSection.getBoundingClientRect().top > 0) return;
  
  if (e.key === 'ArrowDown' && currentIndex < projectItems.length - 1) {
    e.preventDefault();
    scrollToPanel(currentIndex + 1);
  } else if (e.key === 'ArrowUp' && currentIndex > 0) {
    e.preventDefault();
    scrollToPanel(currentIndex - 1);
  }
}

// Initialize Scroll Animations
function initScrollAnimations() {
  // Intersection Observer for revealing elements on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  // Observe all reveal elements
  revealElements.forEach(el => {
    observer.observe(el);
  });
  
  // Handle header scroll state
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Header behavior on scroll
    if (currentScrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Hide header when scrolling down, show when scrolling up
    if (currentScrollY > lastScrollY && currentScrollY > 300) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
    
    // Update active nav link based on scroll position
    updateActiveNavOnScroll();
  });
}

// Initialize Navigation
function initNavigation() {
  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Handle navigation link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Close mobile menu if open
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      
      // Smooth scroll to section
      const targetId = link.getAttribute('href');
      
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80; // Adjust for header height
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Set initial active nav link
  updateActiveNavOnScroll();
}

// Update active navigation link based on scroll position
function updateActiveNavOnScroll() {
  const scrollPosition = window.scrollY + 200; // Add offset for better UX
  
  // Find all sections
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Remove active class from all links
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      
      // Add active class to current section link
      const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}

// Initialize Contact Form
function initContactForm() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const formValues = Object.fromEntries(formData.entries());
      
      // Simple validation
      let isValid = true;
      for (const [key, value] of Object.entries(formValues)) {
        if (!value.trim()) {
          isValid = false;
          // Highlight empty field
          const input = contactForm.querySelector(`[name="${key}"]`);
          input.style.borderColor = 'red';
          
          // Reset border color after 2 seconds
          setTimeout(() => {
            input.style.borderColor = '';
          }, 2000);
        }
      }
      
      if (isValid) {
        // In a real application, you would send the form data to a server
        // This is just a simulation for the demo
        showFormSuccess(contactForm);
      }
    });
  }
}

// Show form submission success message
function showFormSuccess(form) {
  // Create success message
  const successMessage = document.createElement('div');
  successMessage.className = 'form-success';
  successMessage.innerHTML = `
    <div class="success-icon">✓</div>
    <h3>Message Sent!</h3>
    <p>Thank you for reaching out. I'll get back to you shortly.</p>
  `;
  
  // Apply success message styles
  successMessage.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
  successMessage.style.border = '1px solid var(--secondary-color)';
  successMessage.style.borderRadius = 'var(--border-radius-md)';
  successMessage.style.padding = 'var(--spacing-md)';
  successMessage.style.textAlign = 'center';
  successMessage.style.marginTop = 'var(--spacing-md)';
  
  // Clear form
  form.reset();
  
  // Append success message
  form.appendChild(successMessage);
  
  // Remove success message after 5 seconds
  setTimeout(() => {
    form.removeChild(successMessage);
  }, 5000);
}

// Add parallax effect to hero section
window.addEventListener('mousemove', (e) => {
  const heroSection = document.querySelector('.hero-section');
  
  if (heroSection) {
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      
      heroVisual.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
    }
  }
});

// Parallax mouse movement effect
function initParallaxEffect() {
  const heroSection = document.querySelector('.hero-section');
  const heroBackground = document.querySelector('.hero-background');
  const heroContent = document.querySelector('.hero-content');
  const particles = document.querySelectorAll('.particle');
  const blurOverlay = document.querySelector('.blurOverlay');

  // Store original positions for particles
  const particleOriginalPositions = Array.from(particles).map(particle => {
    const style = window.getComputedStyle(particle);
    return {
      top: parseFloat(style.top),
      left: parseFloat(style.left),
      right: style.right !== 'auto' ? parseFloat(style.right) : null
    };
  });

  heroSection.addEventListener('mousemove', (e) => {
    const { width, height } = heroSection.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculate mouse position as percentage of section size
    const moveX = ((mouseX - width / 2) / width) * 100;
    const moveY = ((mouseY - height / 2) / height) * 100;
    
    // Calculate rotation based on mouse position
    const rotateX = (moveY / 50) * -1;
    const rotateY = moveX / 50;

    // Move background slightly
    heroBackground.style.transform = `translate3d(${moveX * 0.05}px, ${moveY * 0.05}px, 0)`;

    // Increase the blur overlay movement factor significantly
    blurOverlay.style.transform = `translate3d(${moveX * 0.1}px, ${moveY * 0.25}px, 0) translateX(-50%)`;
    
    // Move content
    heroContent.style.transform = `translate3d(${moveX * 0.1}px, ${moveY * 0.1}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Move particles with different depth factors
    particles.forEach((particle, index) => {
      const originalPos = particleOriginalPositions[index];
      const depthFactor = 0.15 + (index * 0.02); // Different depth for each particle
      
      let transformX = moveX * depthFactor;
      let transformY = moveY * depthFactor;

      // If particle has right positioning, adjust X transform
      if (originalPos.right !== null) {
        transformX *= -1;
      }

      particle.style.transform = `translate3d(${transformX}px, ${transformY}px, 0)`;
    });
  });

  // Reset positions when mouse leaves
  heroSection.addEventListener('mouseleave', () => {
    heroBackground.style.transform = 'translate3d(0, 0, 0)';
    blurOverlay.style.transform = 'translateX(-50%)';
    heroContent.style.transform = 'translate3d(0, 0, 0) rotateX(0) rotateY(0)';
    particles.forEach(particle => {
      particle.style.transform = 'translate3d(0, 0, 0)';
    });
  });
}