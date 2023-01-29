import { listarPokemones, obtenerDetallesPokemon} from "./services.js";
import { crearTarjetas, modificarUrlActual, obtenerUrlActual, crearUrlApi } from "./manejar-elementos-html-url.js";

const botonNext = document.querySelector("[data-btn-next]");
const botonPrevious = document.querySelector("[data-btn-previous]");
const divContenedorHTML = document.querySelector("[data-listado]");

const mostrarPokemones = () =>{
    const url = crearUrlApi();
    exponerPokemones(url);
};

const exponerPokemones = async (urlApi) =>{
    try{
        const listaJSON = await listarPokemones(urlApi);
        const listaPokemones = listaJSON.results;
        listaPokemones.forEach(({name}) => {
            mostrarPokemon(name);
        });
        paginador(listaJSON);
        
    }catch(error) {alert("Ocurrio un error")};
};

const mostrarPokemon = async (nombre) =>{
    const pokemon = await obtenerDetallesPokemon(nombre);
    const pokemonFoto = pokemon.sprites.front_default;
    const nuevoDiv = crearTarjetas(nombre, pokemonFoto);
    divContenedorHTML.appendChild(nuevoDiv);
};

const paginador = (apiJson) =>{
    const url = obtenerUrlActual();

    if(!apiJson.previous){
        botonNext.href = modificarUrlActual(apiJson.next);

    }else{
        botonNext.href = modificarUrlActual(apiJson.next);
        botonPrevious.href = modificarUrlActual(apiJson.previous);

        if(url.get("offset") === "20"){
            botonPrevious.href = "index.html";
        };
    }
};

mostrarPokemones();