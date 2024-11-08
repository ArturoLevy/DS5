const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';

const sanitizeInput = (input) => {
    return input.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
};

const sanitizeName = (name) => {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/g, '');
};

const getPokemon = async (name) => {
  const response = await fetch(`${POKEAPI_URL}/${name}`);
  if (!response.ok) throw new Error("Pokemon not found");
  return response.json();
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

const renderPokemon = (template, pokemon) => {
  const { name, sprites, weight, height } = pokemon;
  const html = `
    <div class="pokemon-card">
      <div class="pokemon-card__header">
        <h2>${name}</h2>
        <img src="${sprites.front_default}" alt="${name}" />
      </div>
      <div class="pokemon-card__body">
        <p><strong>Peso:</strong> ${weight} hectogramos</p>
        <p><strong>Altura:</strong> ${height} decímetros</p>
      </div>
    </div>
  `;
  template.innerHTML = html;
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

export {
  getPokemon,
  renderPokemon,
  sanitizeName,
};
