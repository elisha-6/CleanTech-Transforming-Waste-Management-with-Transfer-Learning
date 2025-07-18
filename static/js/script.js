document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Theme Switcher
    const themeSwitch = document.getElementById('checkbox');
    const body = document.body;
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'light-theme') {
            themeSwitch.checked = true;
        }
    }
    
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        }
    });

    // Scroll Reveal Animations
    ScrollReveal().reveal('.fade-in', {
        delay: 200,
        distance: '20px',
        origin: 'bottom',
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        interval: 100
    });

    // File Upload Preview
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.getElementById('file-upload');
    const resultContainer = document.querySelector('.result-container');
    const resultImage = document.querySelector('.result-image');
    const predictionText = document.querySelector('.prediction-text');
    const confidenceLevel = document.querySelector('.confidence-level');
    
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', function() {
            fileInput.click();
        });
        
        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    resultImage.src = e.target.result;
                    resultContainer.style.display = 'block';
                    uploadArea.style.display = 'none';
                }
                
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    // Animate confidence meter if prediction exists
    if (confidenceLevel) {
        const confidence = parseFloat(confidenceLevel.dataset.confidence) * 100;
        setTimeout(() => {
            confidenceLevel.style.width = `${confidence}%`;
        }, 500);
    }
});