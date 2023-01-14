const listarPokemones = () => {
    return fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")
    .then(respuesta => respuesta.json());
};

const obtenerDetallesPokemon = (pokemon) =>{
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(respuesta => respuesta.json());
};

const obtenerNextPagina = (next) =>{
    return fetch(`${next}`)
    .then(respuesta => respuesta.json());
};

export{
    listarPokemones,
    obtenerDetallesPokemon,
    obtenerNextPagina,
};