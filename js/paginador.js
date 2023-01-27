import { obtenerNextPagina } from "./services.js";
import { modificarUrlActual, mostrarPokemon } from "./index-pokemon.js";
import { crearUrlApi, obtenerUrlActual } from "./manejar-elementos-html-url.js";

const botonNext = document.querySelector("[data-btn-next]");
const botonPrevious = document.querySelector("[data-btn-previous]");

const paginador = () =>{
    const urlApi = crearUrlApi();
    obtenerNuevaLista(urlApi);
}

const obtenerNuevaLista = async (urlApi)=>{
    const url = obtenerUrlActual();

    try{
        const paginaJson = await obtenerNextPagina(urlApi);
        const pokemones = paginaJson.results;
        pokemones.forEach(({name}) => {
            mostrarPokemon(name);
        });
        asignarHref(url, paginaJson);
    }catch(error) {alert("Ocurrio un error")};
};

const asignarHref = (url, json) =>{
    if(url.get("offset") === "20"){
        botonPrevious.href = "index.html";
    }else{
        botonPrevious.href = modificarUrlActual(json.previous);
    }
    botonNext.href = modificarUrlActual(json.next);
}

export {paginador};