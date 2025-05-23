let slideIndex = 0;
showSlides();
createIndicators();

window.addEventListener('resize', showSlides);

function showSlides() {
    const slides = document.querySelectorAll('.carousel-slide img');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const slideWidth = slides[0].clientWidth;

    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }

    const offset = -slideIndex * slideWidth;
    document.querySelector('.carousel-slide').style.transform = `translateX(${offset}px)`;

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === slideIndex);
    });
}

function createIndicators() {
    const slides = document.querySelectorAll('.carousel-slide img');
    const indicatorContainer = document.querySelector('.carousel-indicators');

    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator';
        indicator.addEventListener('click', () => {
            slideIndex = index;
            showSlides();
        });
        indicatorContainer.appendChild(indicator);
    });
}
