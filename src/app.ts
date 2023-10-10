function buttonEvents() {
    const donateButton = document.querySelectorAll('.btn.donate') as NodeListOf<HTMLButtonElement>;
    const adoptButton = document.querySelectorAll('.btn.apply-to-adopt') as NodeListOf<HTMLButtonElement>;
    const viewAdoptablesButton = document.querySelectorAll('.view-adoptables') as NodeListOf<HTMLButtonElement>;
    const backButton = document.querySelectorAll('.back-button') as NodeListOf<HTMLButtonElement>;
    const cancelButtonModals = document.querySelectorAll('.btn.cancel') as NodeListOf<HTMLButtonElement>;
    const form = document.querySelector(".subscribe-form") as HTMLElement;
    

    function openModal(modalIdElement: string) {
        const modal = document.getElementById(modalIdElement) as HTMLElement;
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    function closeModal(modalIdElement: string) {
        const modal = document.getElementById(modalIdElement) as HTMLElement;
        if (modal) {
            modal.style.display = 'none';
        }
    }

    function redirectToPage(locationPage: string) {
        window.location.href = locationPage;
    }

    if (form) {
        form.addEventListener("submit", function (event) {
            const emailInput = document.getElementById("email") as HTMLInputElement;
        
            if (emailInput.value.trim() === "") {
                event.preventDefault();
            } else {
                event.preventDefault();
                redirectToPage('sucess-page.html')
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
            const modalIdElement = button.getAttribute('data-modal') as string;
            closeModal(modalIdElement);
        });
    });

    if (viewAdoptablesButton) {
        viewAdoptablesButton.forEach(button => {
            button.addEventListener('click', () => redirectToPage('adoptables-page.html'))
        });
    }

    if (backButton) {
        backButton.forEach(button => {
            button.addEventListener('click', () => redirectToPage('index.html'))
        });
    }
}

function carouselEvents() {
    const prevBtn = document.querySelector('.arrow.left') as HTMLElement;
    const nextBtn = document.querySelector('.arrow.right') as HTMLElement;
    const slides = document.querySelectorAll('.carousel-slide') as NodeListOf<HTMLElement>;
    const radioButtons = document.querySelectorAll('input[name="carousel-radio"]') as NodeListOf<HTMLInputElement>;

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