const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

const sanitizeInput = (input) => {
    return input.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
};

export const getPokemon = async (name) => {
    try {
        const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${sanitizeInput(name)}`);
        return response.json();
    } catch (error) {
        console.error('Error al obtener el Pokémon:', error);
        alert('Pokémon no encontrado');
    }
};

export const getAbility = async (name) => {
    try {
        const response = await fetch(`${POKEAPI_BASE_URL}/ability/${sanitizeInput(name)}`);
        return response.json();
    } catch (error) {
        console.error('Error al obtener la habilidad:', error);
        alert('Habilidad no encontrada');
    }
};

export const getEvolutionChain = async (speciesUrl) => {
    try {
        const speciesResponse = await fetch(speciesUrl);
        const speciesData = await speciesResponse.json();
        const evolutionChainUrl = speciesData.evolution_chain.url;

        const evolutionResponse = await fetch(evolutionChainUrl);
        const evolutionData = await evolutionResponse.json();

        return evolutionData.chain;
    } catch (error) {
        console.error('Error al obtener la cadena de evolución:', error);
        alert('Cadena de evolución no encontrada');
    }
};

export const renderPokemon = async (container, pokemon) => {
    if (!pokemon) return;

    const { name, sprites, height, weight, abilities, species } = pokemon;
    const abilityList = abilities.map((ability) => `<li>${ability.ability.name}</li>`).join('');

    const evolutionChain = await getEvolutionChain(species.url);
    const evolutionList = [];
    let currentEvolution = evolutionChain;

    while (currentEvolution) {
        evolutionList.push(currentEvolution.species.name);
        currentEvolution = currentEvolution.evolves_to[0];
    }

    const evolutionHtml = evolutionList.map((evolution) => `<li>${evolution}</li>`).join('');

    container.innerHTML = `
        <h2>${name} (#${pokemon.id})</h2>
        <div class="pokemon-grid">
            <div class="sprite">
                <h3>Sprite</h3>
                <img src="${sprites.front_default}" alt="${name}">
            </div>
            <div class="details">
                <h3>Weight/Height</h3>
                <p>Weight: ${weight}</p>
                <p>Height: ${height}</p>
            </div>
            <div class="evolutions">
                <h3>Evolution Chain</h3>
                <ul>${evolutionHtml}</ul>
            </div>
            <div class="abilities">
                <h3>Abilities</h3>
                <ul>${abilityList}</ul>
            </div>
        </div>
    `;
};

export const renderAbility = (container, abilityData) => {
    if (!abilityData) return;

    const { name, effect_entries, pokemon } = abilityData;
    const effect = effect_entries.find((entry) => entry.language.name === 'en').effect;

    const pokemonList = pokemon
       // .slice(0, 5) 
        .map((poke) => `<li>${poke.pokemon.name}</li>`)
        .join('');

    container.innerHTML = `
        <h2>Ability: ${name}</h2>
        <p>${effect}</p>
        <h3>Pokémon with this ability</h3>
        <ul>${pokemonList}</ul>
    `;
};
