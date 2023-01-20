import { listarPokemones, obtenerDetallesPokemon } from "./services.js";
import { crearTarjetas } from "./crear-div-url.js";

const botonNext = document.querySelector("[data-btn-next]");
const divContenedorHTML = document.querySelector("[data-listado]");

const mostrarPokemones = () =>{
    const urlActual = obtenerUrlActual();
    exponerPokemones(urlActual);
}

const exponerPokemones = async (url) =>{
    
    if((url.get("offset")) && (url.get("limit"))){
        return;
    }

    try{
        const listaJSON = await listarPokemones();
        const listaPokemones = listaJSON.results
        listaPokemones.forEach(({name}) => {
            mostrarPokemon(name);
        });
        botonNext.href = modificarUrl(listaJSON.next);
    }catch(error) {alert("Ocurrio un error")};
};

const mostrarPokemon = async (nombre) =>{
    const pokemon = await obtenerDetallesPokemon(nombre);
    const pokemonFoto = pokemon.sprites.front_default;
    const nuevoDiv = crearTarjetas(nombre, pokemonFoto);
    divContenedorHTML.appendChild(nuevoDiv);
}

const modificarUrl = (next) =>{
    const apiUrl = new URL(next);
    const parametrosUrl = new URLSearchParams(apiUrl.search);
    const parametroOff = parametrosUrl.get("offset");
    const parametroLimit = parametrosUrl.get("limit");
    
    let urlActual = new URL(window.location);
    
    urlActual.searchParams.set("offset", parametroOff);
    urlActual.searchParams.set("limit", parametroLimit);
    
    urlActual = `${urlActual.origin}${urlActual.pathname}?${urlActual.searchParams}`
    return urlActual;
};

const obtenerUrlActual = () =>{
    const url = new URL (window.location).searchParams;
    return url;
}

mostrarPokemones();

export{ modificarUrl, obtenerUrlActual, mostrarPokemon};