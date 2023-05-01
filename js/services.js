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


/////////////////////////////////////////storage

const crearLlavePokemon = (id) =>{
    return `pokemon_${id}`;
}

const crearLlavePokemones = (urlApi) =>{
    const url = new URL(urlApi)
    const parametro1 = url.searchParams.get("offset");
    const parametro2 = url.searchParams.get("limit");

    return `pokemones_${parametro1}_${parametro2}`;
}


const obtenerPokemonStorage = (id) =>{
    const pokemonJson = JSON.parse(localStorage.getItem(crearLlavePokemon(id)));

    if(pokemonJson === null) {
        throw new Error(`Fallo al obtener datos de localstorage`);
    }

    return pokemonJson;
}

const obtenerPokemonesStorage = (url) =>{
    const pokemonesJson = JSON.parse(localStorage.getItem(crearLlavePokemones(id)));
    
    if(pokemonesJson === null) {
        throw new Error(`Fallo al obtener datos de localstorage`);
    }
    
    return pokemonesJson;
}


const guardarPokemonStorage = (id, pokemon) =>{

    if (id === null || typeof(pokemon) !== "object") {
        throw new Error(`Se necesita un limite y una lista de pokemones`);
    }

    localStorage.setItem(crearLlavePokemon(id), JSON.stringify(pokemon));
}

const guardarPokemonesStorage = (urlApi, pokemones) =>{
    if (urlApi === null || typeof(pokemones) !== "object") {
        throw new Error(`Se necesita un limite y una lista de pokemones`);
    }
    localStorage.setItem(crearLlavePokemones(urlApi), JSON.stringify(pokemones));
}


//////////////////////////////////////////////////////// interceptor

const obtenerPokemon = async (id) =>{
    try{
        return obtenerPokemonStorage(id);

    } catch (e){
        const pokemonJson = await obtenerDetallesPokemon(id);
        guardarPokemonStorage(id, pokemonJson);
        return pokemonJson;
    }
}


const obtenerPokemones = async (url) =>{
    try{
        return obtenerPokemonesStorage(url);
    } catch (e){
        const pokemonesJson = await listarPokemones(url);
        guardarPokemonesStorage(url, pokemonesJson);
        return pokemonesJson;
    }
}