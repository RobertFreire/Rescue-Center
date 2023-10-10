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

document.addEventListener('DOMContentLoaded', () => {

    buttonEvents();

});