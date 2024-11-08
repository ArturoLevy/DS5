import { getPokemon, getAbility, renderPokemon, renderAbility } from './pokemon.js';

const htmlElements = {
    form: document.querySelector('#pokemon-form'),
    details: document.querySelector('#pokemon-details'),
    input: document.querySelector('#search-input'),
    typeSelect: document.querySelector('#search-type'),
    clearButton: document.querySelector('button.clear')
};

const handlers = {
    submit: async (event) => {
        event.preventDefault();
        const query = htmlElements.input.value.trim();
        const searchType = htmlElements.typeSelect.value;

        if (!query) {
            alert('Por favor, ingrese un nombre');
            return;
        }

        htmlElements.details.innerHTML = '';
        htmlElements.details.classList.add('hidden'); // Oculta el contenedor de resultados

        if (searchType === 'pokemon') {
            const pokemon = await getPokemon(query);
            if (pokemon) {
                renderPokemon(htmlElements.details, pokemon);
                htmlElements.details.classList.remove('hidden'); // Muestra el contenedor de resultados
            } else {
                alert('No se encontró el Pokémon. Por favor, verifique el nombre e intente nuevamente.');
            }
        } else if (searchType === 'ability') {
            const abilityData = await getAbility(query);
            if (abilityData) {
                renderAbility(htmlElements.details, abilityData);
                htmlElements.details.classList.remove('hidden'); // Muestra el contenedor de resultados
            } else {
                alert('No se encontró la habilidad. Por favor, verifique el nombre e intente nuevamente.');
            }
        }

        htmlElements.clearButton.style.visibility = 'visible';
    },
    clear: () => {
        htmlElements.input.value = '';
        htmlElements.details.innerHTML = '';
        htmlElements.details.classList.add('hidden'); // Oculta el contenedor de resultados
        htmlElements.clearButton.style.visibility = 'hidden';
    },
    input: () => {
        if (htmlElements.input.value.trim() !== '') {
            htmlElements.clearButton.style.visibility = 'visible';
        } else {
            htmlElements.clearButton.style.visibility = 'hidden';
        }
    }
};

const bindEvents = () => {
    htmlElements.form.addEventListener('submit', handlers.submit);
    htmlElements.clearButton.addEventListener('click', handlers.clear);
    htmlElements.input.addEventListener('input', handlers.input);
};

document.addEventListener('DOMContentLoaded', bindEvents);
