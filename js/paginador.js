import { obtenerNextPagina, obtenerDetallesPokemon } from "./services.js";
import { crearDiv, modificarUrl } from "./listar-pokemones.js";

const botonNext = document.querySelector("[data-btn-next]");
const botonPrevious = document.querySelector("[data-btn-previous]");
const divContenedorHTML = document.querySelector("[data-listado]");

const paginador = () =>{
    const urlApi = crearUrl();
    obtenerNuevaLista(urlApi);
}

const obtenerNuevaLista = async (urlApi)=>{
    const url = obtenerUrlActual();

    if(!(url.get("offset")) && !(url.get("limit"))){
        return;
    }
    try{
        const paginaJson = await obtenerNextPagina(urlApi);
        const pokemones = paginaJson.results;
        pokemones.forEach(({name}) => {
            mostrarPokemon(name);
        });
        asignarHref(url, paginaJson);
    }catch(error) {alert("Ocurrio un error")};
};

const mostrarPokemon = async (nombre) =>{
    const pokemon = await obtenerDetallesPokemon(nombre);
    const pokemonFoto = pokemon.sprites.front_default;
    const nuevoDiv = crearDiv(nombre, pokemonFoto);
    divContenedorHTML.appendChild(nuevoDiv);
}

const crearUrl = () =>{
    const obtenerParametros = obtenerUrlActual();
    const parametroOff = obtenerParametros.get("offset");
    const parametroLimit = obtenerParametros.get("limit");

    let urlApi = new URL("https://pokeapi.co/api/v2/pokemon");

    urlApi.searchParams.set("offset", parametroOff);
    urlApi.searchParams.set("limit", parametroLimit);
    urlApi = `${urlApi.origin}${urlApi.pathname}?${urlApi.searchParams}`

    return urlApi
};

const obtenerUrlActual = () =>{
    const url = new URL (window.location).searchParams;
    return url;
}

const asignarHref = (url, json) =>{
    if(url.get("offset") === "20"){
        botonPrevious.href = "index.html";
    }else{
        botonPrevious.href = modificarUrl(json.previous);
    }
    botonNext.href = modificarUrl(json.next);
}

paginador();