import { getPokemon, renderPokemon, sanitizeName } from './pokemon.js';

const htmlElements = {
    form: document.querySelector('#pokemon-form'),
    details: document.querySelector('#pokemon-details'),
    clearButton: document.querySelector('.clear'),
    input: document.querySelector('#search-input')
};

const handlers = {
    submit: async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const pokemonName = formData.get('search');
        const sanitizedName = sanitizeName(pokemonName);
        if (!sanitizedName) {
            alert('Por favor, ingrese un nombre válido');
            return;
        };
        const pokemon = await getPokemon(sanitizedName);
        renderPokemon(htmlElements.details, pokemon);
        htmlElements.details.classList.remove('hidden'); 
        htmlElements.clearButton.style.visibility = 'visible'; 
    },
    clear: () => {
        htmlElements.input.value = '';
        htmlElements.details.innerHTML = '';
        htmlElements.details.classList.add('hidden');
        htmlElements.clearButton.style.visibility = 'hidden'; 
    }
};

const bindEvents = () => {
    htmlElements.form.addEventListener('submit', handlers.submit);
    htmlElements.clearButton.addEventListener('click', handlers.clear);
};

const init = () => {
    bindEvents();
};

init();
