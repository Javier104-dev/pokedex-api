import { Pokemon, Pokemones } from "./clases.js";

const mapearPokemon = (pokemonApi) =>{
    const {
        sprites: {front_default: foto}, //Para acceder a un objeto dentro de otro objeto usamos {}, para poder desestructurarlo
        name: nombre,
        height: altura,
        weight: peso,
        types: tipo,
        abilities: habilidades
    } = pokemonApi;

    return new Pokemon(
        foto,
        nombre,
        altura,
        peso,
        tipo.map( tipo => tipo.type.name),
        habilidades.map( habilidad => habilidad.ability.name)
    );
}

const mapearPagina = (api) =>{
    const {
        results: listaPokemones,
        previous: pagAnterior,
        next: pagSiguiente,
    } = api;

    return new Pokemones(
        listaPokemones.map( pokemon => pokemon.name),
        pagAnterior,
        pagSiguiente
    );
}

export { 
    mapearPokemon,
    mapearPagina
}