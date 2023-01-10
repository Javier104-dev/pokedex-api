const listaPokemones = () => {
    return fetch("https://pokeapi.co/api/v2/pokemon")
    .then(respuesta => respuesta.json())
};

const obtenerImagen = (pokemon) =>{
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(respuesta => respuesta.json())
};

export const pokemonServices = {
    listaPokemones,
    obtenerImagen,
};