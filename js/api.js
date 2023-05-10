const url = "https://pokeapi.co/api/v2/pokemon";

const obtenerListaPokemones = async (next) =>{
    const respuesta = await fetch(`${next}`);
    return respuesta.json();
};

const obtenerCaracteristicasPokemon = async (pokemon) =>{
    const respuesta = await fetch(`${url}/${pokemon}`);
    return await respuesta.json();
};

export{
    obtenerListaPokemones,
    obtenerCaracteristicasPokemon
};