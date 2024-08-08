//  Open and Close Menu List 
let btnMenu = document.getElementById('menu-btn');
let menuList = document.getElementById('menu-list');
let btnClose = document.getElementById('btn-close');


btnMenu.addEventListener('click', () => {
    menuList.style.display = 'block';
});

btnClose.addEventListener('click', () => {
    menuList.style.display = 'none';
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Slides Header

let slideIndex = 0;
let timer;

showSlides();

function showSlides() {
    let slides = document.getElementsByClassName('slide');
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].classList.add("animate__animated", "animate__fadeInLeft"); // Add FadeInLeft animation
    timer = setTimeout(() => {
        slides[slideIndex - 1].classList.remove("animate__animated", "animate__fadeInLeft"); // remove fadeInLeft animation
        showSlides();
    }, 10000);  // change image every 10 seconds
}

function nextSlides() {
    clearTimeout(timer);
    showSlides(slideIndex + 1);
}
function previousSlides() {
    clearTimeout(timer);
    showSlides(slideIndex - 1);
}

function currentSlides(n) {
    clearTimeout(timer);
    showSlides(slideIndex = n);
}

///////////////////////////////////////////////////////////////////////////////
// Current year in footer
// Get the current year
const currentYear = new Date().getFullYear();

let year = document.getElementById('current-year');

year.textContent = currentYear;
