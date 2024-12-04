document.querySelectorAll('.accordion-header').forEach((button) => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const allContents = document.querySelectorAll('.accordion-content');
        const allButtons = document.querySelectorAll('.accordion-header');

        // Cierra todas las demás ventanas desplegables
        allContents.forEach((item) => {
            if (item !== content) {
                item.style.display = 'none';
            }
        });

        // Desactiva todas las demás barras
        allButtons.forEach((btn) => {
            if (btn !== button) {
                btn.classList.remove('active');
            }
        });

        // Alterna el estado actual
        const isOpen = content.style.display === 'block';
        content.style.display = isOpen ? 'none' : 'block';
        button.classList.toggle('active', !isOpen);
    });
});