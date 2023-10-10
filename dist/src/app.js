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
document.addEventListener('DOMContentLoaded', () => {
    buttonEvents();
});
