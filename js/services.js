const url = "https://pokeapi.co/api/v2/pokemon";

const listarPokemones = async (next) =>{
    const respuesta = await fetch(`${next}`);
    return respuesta.json();
};

const obtenerDetallesPokemon = async (pokemon) =>{
    const respuesta = await fetch(`${url}/${pokemon}`);
    return await respuesta.json();
};

export{
    listarPokemones,
    obtenerDetallesPokemon,
};