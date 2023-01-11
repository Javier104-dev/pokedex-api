const listaPokemones = () => {
    return fetch("https://pokeapi.co/api/v2/pokemon")
    .then(respuesta => respuesta.json())
};

const obtenerDetallesPokemon = (pokemon) =>{
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(respuesta => respuesta.json())
};

export const pokemonServices = {
    listaPokemones,
    obtenerDetallesPokemon,
};