let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide img');
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    // Ajusta a posição do slide para mostrar a imagem atual
    const offset = -currentSlide * 100;
    document.querySelector('.carousel-slide').style.transform = `translateX(${offset}%)`;

    // Atualiza a opacidade das imagens para o efeito de transição
    slides.forEach((slide, i) => {
        slide.style.opacity = (i === currentSlide) ? '1' : '0';
    });
}

function moveSlide(n) {
    showSlide(currentSlide + n);
}

function autoSlide() {
    moveSlide(1);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide); // Inicializa o slide ativo
    setInterval(autoSlide, 3000); // Muda o slide a cada 3 segundos
});
