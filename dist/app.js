"use strict";
function buttonEvents() {
    const donateButton = document.querySelectorAll('.btn.donate');
    const adoptButton = document.querySelectorAll('.btn.apply-to-adopt');
    const viewAdoptablesButton = document.querySelectorAll('.view-adoptables');
    const backButton = document.querySelectorAll('.back-button');
    const cancelButtonModals = document.querySelectorAll('.btn.cancel');
    const form = document.querySelector(".subscribe-form");
    function openModal(modalIdElement) {
        const modal = document.getElementById(modalIdElement);
        if (modal) {
            modal.style.display = 'flex';
        }
    }
    function closeModal(modalIdElement) {
        const modal = document.getElementById(modalIdElement);
        if (modal) {
            modal.style.display = 'none';
        }
    }
    function redirectToPage(locationPage) {
        window.location.href = locationPage;
    }
    if (form) {
        form.addEventListener("submit", function (event) {
            const emailInput = document.getElementById("email");
            if (emailInput.value.trim() === "") {
                event.preventDefault();
            }
            else {
                event.preventDefault();
                redirectToPage('sucess-page.html');
            }
        });
    }
    donateButton.forEach(button => {
        button.addEventListener('click', () => openModal('donate-modal'));
    });
    adoptButton.forEach(button => {
        button.addEventListener('click', () => openModal('adopt-modal'));
    });
    cancelButtonModals.forEach(button => {
        button.addEventListener('click', () => {
            const modalIdElement = button.getAttribute('data-modal');
            closeModal(modalIdElement);
        });
    });
    if (viewAdoptablesButton) {
        viewAdoptablesButton.forEach(button => {
            button.addEventListener('click', () => redirectToPage('adoptables-page.html'));
        });
    }
    if (backButton) {
        backButton.forEach(button => {
            button.addEventListener('click', () => redirectToPage('index.html'));
        });
    }
}
function carouselEvents() {
    const prevBtn = document.querySelector('.arrow.left');
    const nextBtn = document.querySelector('.arrow.right');
    const slides = document.querySelectorAll('.carousel-slide');
    const radioButtons = document.querySelectorAll('input[name="carousel-radio"]');
    const totalSlides = slides.length;
    const slidesPerView = 4;
    let currentSlide = 0;
    function showSlides() {
        slides.forEach((slide, index) => {
            let newIndex = (index + currentSlide) % totalSlides;
            if (newIndex < 0) {
                newIndex = totalSlides + newIndex;
            }
            slide.style.display = 'block';
            slide.style.order = ((index - currentSlide + totalSlides) % totalSlides + slidesPerView) % slidesPerView + '';
        });
        radioButtons[currentSlide].checked = true;
    }
    function nextSlides() {
        currentSlide++;
        if (currentSlide >= totalSlides) {
            currentSlide = 0; // Reinicia para a primeira imagem quando chegar à última
        }
        showSlides();
    }
    function prevSlides() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = totalSlides - 1;
        }
        showSlides();
    }
    prevBtn.addEventListener('click', () => {
        prevSlides();
    });
    nextBtn.addEventListener('click', () => {
        nextSlides();
    });
    radioButtons.forEach((radioButton, index) => {
        radioButton.addEventListener('click', () => {
            currentSlide = index;
            showSlides();
        });
    });
    showSlides();
}
document.addEventListener('DOMContentLoaded', () => {
    carouselEvents();
    buttonEvents();
});
