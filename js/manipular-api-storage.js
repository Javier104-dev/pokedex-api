import { obtenerListaPokemones, obtenerCaracteristicasPokemon } from "./api.js";
import { obtenerPokemonStorage, guardarPokemonStorage, obtenerPokemonesStorage, guardarPokemonesStorage } from "./localStorage.js";
import { mapearPagina, mapearPokemon } from "./mapeador.js";

/******************** Intermediario entre el localStorage y la API *******************************/

const obtenerPokemon = async (id) =>{
    try{
        return obtenerPokemonStorage(id);

    } catch (e){
        
        const pokemonJson = await obtenerCaracteristicasPokemon(id);
        const instanciaPokemon = mapearPokemon(pokemonJson)
        guardarPokemonStorage(id, instanciaPokemon);
        return instanciaPokemon;
    }
}

const obtenerPokemones = async (url) =>{
    try{
        return obtenerPokemonesStorage(url);

    } catch (e){

        const pokemonesJson = await obtenerListaPokemones(url);
        const instanciaPokemones = mapearPagina(pokemonesJson)
        guardarPokemonesStorage(url, instanciaPokemones);
        return instanciaPokemones;
    }
}

export {
    obtenerPokemon,
    obtenerPokemones
}