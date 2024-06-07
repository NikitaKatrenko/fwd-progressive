class ModalManager {
    constructor() {
        this.modalTriggers =document.querySelectorAll('.js-modal-trigger');
        this.modalCloseElements =document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button:not(.geo)');

        this.modalTriggers.forEach($trigger => {
            const modalId = $trigger.dataset.target;
            const $target =document.getElementById(modalId);

            $trigger.addEventListener('click', () => this.openModal($target));
        });

        this.modalCloseElements.forEach($close => {
            const $target = $close.closest('.modal');

            $close.addEventListener('click', () => this.closeModal($target));
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === "Escape") {
                this.closeAllModals();
            }
        });
    }

    openModal($modal) {
        $modal.classList.add('is-active');
        this.clearModalInputs();
    }

    closeModal($modal) {
        $modal.classList.remove('is-active');
    }

    closeAllModals() {
        const modals =document.querySelectorAll('.modal.is-active');
        modals.forEach($modal => {
            this.closeModal($modal);
        });
    }

    clearModalInputs() {
        document.getElementById('modal-post-name').value = '';
        document.getElementById('modal-post-text').value = '';
    }
}

class NavbarManager {
    constructor() {
        this.navbarBurgers =Array.from(document.querySelectorAll('.navbar-burger'));

        this.navbarBurgers.forEach(burger => {
            burger.addEventListener('click', () => this.toggleNavbar(burger));
        });
    }

    toggleNavbar(burger) {
        const target = burger.dataset.target;
        const $target =document.getElementById(target);

        burger.classList.toggle('is-active');
        $target.classList.toggle('is-active');
    }
}

// Instantiate the ModalManager when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    const modalManager = new ModalManager();
    const navbarManager = new NavbarManager();
});
