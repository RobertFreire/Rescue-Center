"use strict";
function buttonEvents() {
    const donateButton = document.querySelectorAll('.donate');
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
    if (donateButton) {
        donateButton.forEach(button => {
            button.addEventListener('click', () => openModal('donate-modal'));
        });
    }
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
function adoptModalEvents() {
    const applyButton = document.querySelector('.wanna-adopt');
    const emailInput = document.getElementById('email-modal-adopt');
    const fullNameInput = document.getElementById('full-name');
    const checkbox = document.getElementById('checkbox');
    const daySelect = document.getElementById('day');
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');
    const emailError = document.getElementById('email-error');
    const fullNameError = document.getElementById('name-error');
    const dobError = document.getElementById('dob-error');
    const checkboxError = document.getElementById('checkbox-error');
    function DaySelect() {
        if (daySelect)
            for (let day = 1; day <= 31; day++) {
                const option = new Option(day.toString(), day.toString());
                daySelect.appendChild(option);
            }
    }
    function MonthSelect() {
        if (monthSelect) {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            for (let i = 0; i < months.length; i++) {
                const option = new Option(months[i], (i + 1).toString());
                monthSelect.appendChild(option);
            }
        }
    }
    function YearSelect() {
        if (yearSelect) {
            const currentYear = new Date().getFullYear();
            const startYear = 1900;
            for (let year = currentYear; year >= startYear; year--) {
                const option = new Option(year.toString(), year.toString());
                yearSelect.appendChild(option);
            }
        }
    }
    DaySelect();
    MonthSelect();
    YearSelect();
    function validate() {
        const email = emailInput.value;
        const fullName = fullNameInput.value;
        const day = daySelect.value;
        const month = monthSelect.value;
        const year = yearSelect.value;
        const agreedToTerms = checkbox.checked;
        let validation = true;
        if (!email) {
            emailError.style.display = 'block';
            validation = false;
        }
        if (!fullName) {
            fullNameError.style.display = 'block';
            validation = false;
        }
        if (day === '' || month === '' || year === '') {
            dobError.style.display = 'block';
            validation = false;
        }
        if (!agreedToTerms) {
            checkboxError.style.display = 'block';
            validation = false;
        }
        return validation;
    }
    if (applyButton) {
        applyButton.addEventListener('click', () => {
            if (validate()) {
                window.location.href = 'sucess-page.html';
            }
        });
    }
}
function donateModalEvents() {
    const emailInput = document.getElementById('email-modal-donate');
    const moneyInput = document.getElementById('money');
    const pixRadio = document.getElementById('pix');
    const creditCardRadio = document.getElementById('credit-card');
    const paypalRadio = document.getElementById('paypal');
    const donateButton = document.querySelector('.wanna-help');
    const emailError = document.getElementById('email-error');
    const moneyError = document.getElementById('money-error');
    const paymentError = document.getElementById('payment-error');
    function validate() {
        const email = emailInput.value;
        const money = parseFloat(moneyInput.value);
        const paymentMethod = pixRadio.checked || creditCardRadio.checked || paypalRadio.checked;
        let validation = true;
        if (!email) {
            emailError.style.display = 'block';
            validation = false;
        }
        if (!money || money < 1) {
            moneyError.style.display = 'block';
            validation = false;
        }
        if (!paymentMethod) {
            paymentError.style.display = 'block';
            validation = false;
        }
        return validation;
    }
    if (donateButton) {
        donateButton.addEventListener('click', () => {
            if (validate()) {
                window.location.href = 'sucess-page.html';
            }
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
        if (radioButtons.length === 0) {
            return;
        }
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
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlides();
        });
        nextBtn.addEventListener('click', () => {
            nextSlides();
        });
    }
    radioButtons.forEach((radioButton, index) => {
        radioButton.addEventListener('click', () => {
            currentSlide = index;
            showSlides();
        });
    });
    showSlides();
}
document.addEventListener('DOMContentLoaded', () => {
    buttonEvents();
    donateModalEvents();
    adoptModalEvents();
    carouselEvents();
});
