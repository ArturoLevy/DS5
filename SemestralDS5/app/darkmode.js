(function () {
    const darkMode = (() => {
        const toggleButton = document.getElementById('toggleDarkMode');
        const body = document.body;

        // Verifica el estado del modo oscuro almacenado en localStorage
        if (localStorage.getItem('dark-mode') === 'enabled') {
            body.classList.add('dark-mode');
            toggleButton.textContent = "🌞";  // Mostrar icono de sol si está en modo oscuro
        }

        // Función para alternar entre el modo oscuro y claro
        const toggleDarkMode = () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                toggleButton.textContent = "🌞";  // Cambiar a sol si está en modo oscuro
                localStorage.setItem('dark-mode', 'enabled');
            } else {
                toggleButton.textContent = "🌙";  // Cambiar a luna si está en modo claro
                localStorage.setItem('dark-mode', 'disabled');
            }
        };

        const bindEvents = () => {
            toggleButton.addEventListener("click", toggleDarkMode);
        };

        const init = () => {
            bindEvents();
        };

        return {
            init,
        };
    })();

    darkMode.init();
})();
