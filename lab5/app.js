const App = (() => {
  const htmlElements = {
      form: document.querySelector('form'),
      response: document.querySelector('#response'),
      colorSelect: document.querySelector('#color')
  };

  const handlers = {
      onInputChange(e) {
        htmlElements.response.textContent = reversa(e.target.value);
      }, 
      onColorChange(e) {
      //  htmlElements.response.style.color = htmlElements.colorSelect.value;
        const selectColorClass = htmlElements.colorSelect.value;
        htmlElements.response.className = '';
        htmlElements.response.classList.add(selectColorClass);
      }
  };

  const bindEvents = () => {
      htmlElements.form.elements.cadena.addEventListener('input', handlers.onInputChange);
      htmlElements.colorSelect.addEventListener('change', handlers.onColorChange);
  };

  return {
      init() {
          bindEvents();
      }
  }; 
})();

const reversa = c => String(c).split('').reverse().join('');

App.init();