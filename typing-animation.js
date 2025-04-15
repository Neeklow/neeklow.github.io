document.addEventListener('DOMContentLoaded', () => {
    // Get the hero section
    const heroSection = document.querySelector('.hero-section');
    const heroContent = heroSection.querySelector('.hero-content');

    // Animation timing configuration
    const config = {
        typingSpeed: 75,        // Speed between each character (in ms)
        eraseSpeed: 50,         // Speed of erasing characters (in ms)
        sectionDelay: 150,      // Delay between sections (in ms)
        initialDelay: 50,       // Initial delay before starting (in ms)
        cursorHideDelay: 100,   // How long cursor stays visible after typing (in ms)
        sentenceDelay: 3000     // How long to show each sentence (in ms)
    };

    // Clear existing content
    heroContent.innerHTML = '';

    // Create the title structure
    const h1 = document.createElement('h1');
    h1.className = 'reveal-text';
    
    const titleContainer = document.createElement('div');
    titleContainer.className = 'title-container';

    // Create text elements
    const texts = {
        thin: "Hi I'm",
        bold: "Niccoló Fioritti",
        leads: [
            "Mostly overthinking",
            "Building with Unity",
            "Deleting default cubes",
            "Pushing to Git...",
            "Refactoring",
            "Disentangling Shadergraphs",
            "Tinkering with VVVV"

        ]
    };

    // Create and append thin text
    const thinText = document.createElement('span');
    thinText.className = 'thin';
    titleContainer.appendChild(thinText);

    // Create and append bold text with specific styles
    const boldText = document.createElement('span');
    boldText.className = 'bold';
    boldText.style.fontFamily = "'Poppins', sans-serif";
    boldText.style.fontWeight = '400';
    boldText.style.margin = '0';
    boldText.style.color = '#002331';
    titleContainer.appendChild(boldText);

    // Append title container to h1
    h1.appendChild(titleContainer);
    heroContent.appendChild(h1);

    // Create and append lead text
    const lead = document.createElement('p');
    lead.className = 'lead reveal-text delay-1';
    heroContent.appendChild(lead);

    // Create cursor element
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '█';
    cursor.style.opacity = '0';
    heroContent.appendChild(cursor);

    // Function to type text
    function typeText(element, text, delay = 0) {
        return new Promise(resolve => {
            let currentText = '';
            const chars = text.split('');
            
            cursor.style.opacity = '1';
            element.appendChild(cursor);
            
            function type(index) {
                if (index < chars.length) {
                    currentText += chars[index];
                    element.textContent = currentText;
                    
                    // Reapply styles for bold text since textContent resets them
                    if (element === boldText) {
                        element.style.fontFamily = "'Poppins', sans-serif";
                        element.style.fontWeight = '400';
                        element.style.margin = '0';
                        element.style.color = '#002331';
                    }
                    
                    element.appendChild(cursor);
                    setTimeout(() => type(index + 1), config.typingSpeed);
                } else {
                    if (element !== lead) {
                        setTimeout(() => {
                            cursor.style.opacity = '0';
                            resolve();
                        }, config.cursorHideDelay);
                    } else {
                        cursor.style.animation = 'blink 0.7s step-end infinite';
                        resolve();
                    }
                }
            }
            
            setTimeout(() => type(0), delay);
        });
    }

    // Function to erase text
    function eraseText(element) {
        return new Promise(resolve => {
            let text = element.textContent;
            
            function erase() {
                if (text.length > 0) {
                    text = text.slice(0, -1);
                    element.textContent = text;
                    element.appendChild(cursor);
                    setTimeout(erase, config.eraseSpeed);
                } else {
                    resolve();
                }
            }
            
            erase();
        });
    }

    // Function to cycle through lead texts
    async function cycleLead(index = 0) {
        const text = texts.leads[index];
        await typeText(lead, text);
        
        // Wait before erasing
        await new Promise(resolve => setTimeout(resolve, config.sentenceDelay));
        
        // Erase the text
        await eraseText(lead);
        
        // Move to next text or back to start
        const nextIndex = (index + 1) % texts.leads.length;
        
        // Small pause before typing next text
        await new Promise(resolve => setTimeout(resolve, config.sectionDelay));
        
        // Continue the cycle
        cycleLead(nextIndex);
    }

    // Start typing animations in sequence
    async function startTyping() {
        await typeText(thinText, texts.thin, config.initialDelay);
        await typeText(boldText, texts.bold, config.sectionDelay);
        cycleLead(0); // Start the lead text cycle
    }

    startTyping();
}); 