const listaPokemones = () => {
    return fetch("https://pokeapi.co/api/v2/pokemon")
    .then(respuesta => respuesta.json())
};

export const pokemonServices = {
    listaPokemones,
};