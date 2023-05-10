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

export {
    guardarPokemonesStorage,
    guardarPokemonStorage,
    obtenerPokemonStorage,
    obtenerPokemonesStorage
}