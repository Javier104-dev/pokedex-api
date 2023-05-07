import { mapearPokemon, mapearPagina } from "./mapeado.js";

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
    obtenerDetallesPokemon,
    obtenerPokemon,
    obtenerPokemones
};


/******************** Crear keys para el localStorage *******************************/

const crearLlavePokemon = (id) =>{
    return `pokemon_${id}`;
}

const crearLlavePokemones = (urlApi) =>{
    const url = new URL(urlApi)
    const parametro1 = url.searchParams.get("offset");
    const parametro2 = url.searchParams.get("limit");

    return `pokemones_${parametro1}_${parametro2}`;
}


/******************** Obtener datos del localStorage *******************************/


const obtenerPokemonStorage = (id) =>{
    const pokemonJson = JSON.parse(localStorage.getItem(crearLlavePokemon(id)));

    if(pokemonJson === null) {
        throw new Error(`Fallo al obtener datos de localstorage`);
    }

    return pokemonJson;
}

const obtenerPokemonesStorage = (url) =>{
    const pokemonesJson = JSON.parse(localStorage.getItem(crearLlavePokemones(url)));
    
    if(pokemonesJson === null) {
        throw new Error(`Fallo al obtener datos de localstorage`);
    }
    
    return pokemonesJson;
}


/******************** Guardar datos en el localStorage *******************************/


const guardarPokemonStorage = (id, pokemon) =>{

    if (id === null || typeof pokemon !== "object") {
        throw new Error(`Fallo al intentar guardar los datos en localStorage`);
    }

    localStorage.setItem(crearLlavePokemon(id), JSON.stringify(pokemon));
}

const guardarPokemonesStorage = (urlApi, pokemones) =>{
    if (urlApi === null || typeof pokemones  !== "object") {
        throw new Error(`Fallo al intentar guardar los datos en localStorage`);
    }
    localStorage.setItem(crearLlavePokemones(urlApi), JSON.stringify(pokemones));
}


/******************** Intermediario entre el localStorage y la API *******************************/


const obtenerPokemon = async (id) =>{
    try{
        return obtenerPokemonStorage(id);

    } catch (e){
        const pokemonJson = await obtenerDetallesPokemon(id);
        const instanciaPokemon = mapearPokemon(pokemonJson)
        guardarPokemonStorage(id, instanciaPokemon);
        return instanciaPokemon;
    }
}

const obtenerPokemones = async (url) =>{
    try{
        return obtenerPokemonesStorage(url);

    } catch (e){

        const pokemonesJson = await listarPokemones(url);
        const instanciaPokemones = mapearPagina(pokemonesJson)
        guardarPokemonesStorage(url, instanciaPokemones);
        return instanciaPokemones;
    }
}