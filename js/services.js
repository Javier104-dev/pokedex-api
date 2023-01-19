const url = "https://pokeapi.co/api/v2/pokemon";

const listarPokemones = async () => {
    const respuesta = await fetch(url);
    return await respuesta.json();
};

const obtenerDetallesPokemon = async (pokemon) =>{
    const respuesta = await fetch(`${url}/${pokemon}`);
    return await respuesta.json();
};

const obtenerNextPagina = async (next) =>{
    const respuesta = await fetch(`${next}`);
    return respuesta.json();
};

export{
    listarPokemones,
    obtenerDetallesPokemon,
    obtenerNextPagina,
};

/*
const listarPokemones = () => {
    return fetch(url)
    .then(respuesta => respuesta.json());
};
*/