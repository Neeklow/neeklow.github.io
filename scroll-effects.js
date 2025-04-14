document.addEventListener('DOMContentLoaded', () => {
    const heroBackground = document.querySelector('.hero-background');
    const sections = document.querySelectorAll('section');
    const blurThreshold = 100; // Amount of scroll before blur starts
    const maxBlur = 10; // Maximum blur amount in pixels

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Handle hero background blur
        if (scrollPosition > blurThreshold) {
            heroBackground.classList.add('blur');
        } else {
            heroBackground.classList.remove('blur');
        }

        // Handle section transitions
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionBottom = rect.bottom;
            const viewportHeight = window.innerHeight;
            
            // Calculate how much of the section is visible
            const visiblePercentTop = Math.max(0, Math.min(1, (viewportHeight - sectionTop) / viewportHeight));
            const visiblePercentBottom = Math.max(0, Math.min(1, sectionBottom / viewportHeight));
            
            // Calculate blur based on visibility
            const blurAmount = maxBlur * (1 - Math.min(visiblePercentTop, visiblePercentBottom));
            
            // Apply the blur effect
            section.style.setProperty('--section-blur', `${blurAmount}px`);
        });
    });
}); 