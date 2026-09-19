const slides = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slides img").length;

let indice = 0;

document.querySelector(".next").addEventListener("click", () => {
    indice++;
    if (indice >= totalSlides) {
        indice = 0;
    }
    atualizarCarrossel();
});

document.querySelector(".prev").addEventListener("click", () => {
    indice--;
    if (indice < 0) {
        indice = totalSlides - 1;
    }
    atualizarCarrossel();
});

function atualizarCarrossel() {
    const larguraSlide = slides.parentElement.clientWidth;
    slides.style.transform = `translateX(-${indice * larguraSlide}px)`;
}

window.addEventListener("resize", atualizarCarrossel);
