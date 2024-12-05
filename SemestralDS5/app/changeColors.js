const colorsChanges = (() => {

    const htmlElements = {
        select: document.querySelector("#api-method"),
    } 

    const funcChange = () => {
        const selectedOption = htmlElements.select.options[htmlElements.select.selectedIndex];
        // Aplicar el color del fondo según la clase del <option> seleccionado
        htmlElements.select.style.backgroundColor = window.getComputedStyle(selectedOption).backgroundColor;
        htmlElements.select.style.color = window.getComputedStyle(selectedOption).color;
        htmlElements.select.style.fontWeight = window.getComputedStyle(selectedOption).fontWeight;
    }

    htmlElements.select.addEventListener("change", funcChange)
    
})();



