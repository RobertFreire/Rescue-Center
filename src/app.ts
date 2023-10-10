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

function adoptModalEvents() {
    const applyButton = document.querySelector('.wanna-adopt') as HTMLButtonElement;
    const emailInput = document.getElementById('email-modal-adopt') as HTMLInputElement;
    const fullNameInput = document.getElementById('full-name') as HTMLInputElement;
    const checkbox = document.getElementById('checkbox') as HTMLInputElement;
    const daySelect = document.getElementById('day') as HTMLSelectElement;
    const monthSelect = document.getElementById('month') as HTMLSelectElement;
    const yearSelect = document.getElementById('year') as HTMLSelectElement;

    const emailError = document.getElementById('email-error') as HTMLElement;
    const fullNameError = document.getElementById('name-error') as HTMLElement;
    const dobError = document.getElementById('dob-error') as HTMLElement;
    const checkboxError = document.getElementById('checkbox-error') as HTMLElement;

    function DaySelect() {
        for (let day = 1; day <= 31; day++) {
            const option = new Option(day.toString(), day.toString());
            daySelect.appendChild(option);
        }
    }

    function MonthSelect() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        for (let i = 0; i < months.length; i++) {
            const option = new Option(months[i], (i + 1).toString());
            monthSelect.appendChild(option);
        }
    }

    function YearSelect() {
        const currentYear = new Date().getFullYear();
        const startYear = 1900;

        for (let year = currentYear; year >= startYear; year--) {
            const option = new Option(year.toString(), year.toString());
            yearSelect.appendChild(option);
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

    applyButton.addEventListener('click', () => {
        if (validate()) {
            window.location.href = 'sucess-page.html'
        } 
    });

}

document.addEventListener('DOMContentLoaded', () => {
    
    carouselEvents();
    buttonEvents();
    adoptModalEvents();

});