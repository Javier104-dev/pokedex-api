import { listarPokemones, obtenerDetallesPokemon } from "./services.js";
import { crearTarjetas, modificarUrlActual, obtenerUrlActual } from "./manejar-elementos-html-url.js";
import { paginador } from "./paginador.js";

const botonNext = document.querySelector("[data-btn-next]");
const divContenedorHTML = document.querySelector("[data-listado]");

const mostrarPokemones = () =>{
    const urlActual = obtenerUrlActual();

    if((urlActual.get("offset")) && (urlActual.get("limit"))){
        paginador();

    }else{
        exponerPokemones();
    }
}

const exponerPokemones = async () =>{

    try{
        const listaJSON = await listarPokemones();
        const listaPokemones = listaJSON.results;
        listaPokemones.forEach(({name}) => {
            mostrarPokemon(name);
        });
        botonNext.href = modificarUrlActual(listaJSON.next);
    }catch(error) {alert("Ocurrio un error")};
};

const mostrarPokemon = async (nombre) =>{
    const pokemon = await obtenerDetallesPokemon(nombre);
    const pokemonFoto = pokemon.sprites.front_default;
    const nuevoDiv = crearTarjetas(nombre, pokemonFoto);
    divContenedorHTML.appendChild(nuevoDiv);
}

mostrarPokemones();

export{ modificarUrlActual, mostrarPokemon};