import { obtenerDetallesPokemon, obtenerPokemones} from "./services.js";
import { crearTarjetas, modificarUrlActual, obtenerUrlActual, crearUrlApi } from "./manejar-elementos-html-url.js";

const botonNext = document.querySelector("[data-btn-next]");
const botonPrevious = document.querySelector("[data-btn-previous]");
const divContenedorHTML = document.querySelector("[data-listado]");

const mostrarPokemones = () =>{
    exponerPokemones(crearUrlApi());
};

const exponerPokemones = async (urlApi) =>{
    try{
        const listaJSON = await obtenerPokemones(urlApi);
        const listaPromesas = listaJSON.results.map(pokemon => obtenerDetallesPokemon(pokemon.name));
        const listaPromesasResueltas = await Promise.all(listaPromesas);
        listaPromesasResueltas.forEach(pokemon =>{
            mostrarPokemon(pokemon.name, pokemon.sprites.front_default);
        })
        paginador(listaJSON);
        
    }catch(error) {alert("Ocurrio un error")};
};

const mostrarPokemon = (nombre, foto) =>{
    const nuevoDiv = crearTarjetas(nombre, foto);
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