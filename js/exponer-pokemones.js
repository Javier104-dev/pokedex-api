import { obtenerDetallesPokemon, obtenerPokemones} from "./services.js";
import { crearTarjetas, modificarUrlActual, obtenerUrlActual } from "./manejar-elementos-html-url.js";

const botonNext = document.querySelector("[data-btn-next]");
const botonPrevious = document.querySelector("[data-btn-previous]");
const divContenedorHTML = document.querySelector("[data-listado]");


const exponerPokemones = async (urlApi) =>{
    try{
        const { pokemones, anterior, siguiente } = await obtenerPokemones(urlApi);
        const listaPromesas = pokemones.map(pokemon => obtenerDetallesPokemon(pokemon));
        const listaPromesasResueltas = await Promise.all(listaPromesas);
            listaPromesasResueltas.forEach(pokemon =>{
                mostrarPokemon(pokemon.name, pokemon.sprites.front_default);
            })
        paginador(anterior, siguiente);
        
    }catch(error) {alert("Ocurrio un error")};
};

const mostrarPokemon = (nombre, foto) =>{
    const nuevoDiv = crearTarjetas(nombre, foto);
    divContenedorHTML.appendChild(nuevoDiv);
};

const paginador = (pagAnterior, pagSiguiente) =>{
    const url = obtenerUrlActual();

    if(!pagAnterior){
        botonNext.href = modificarUrlActual(pagSiguiente);

    }else{
        botonNext.href = modificarUrlActual(pagSiguiente);
        botonPrevious.href = modificarUrlActual(pagAnterior);

        if(url.get("offset") === "20"){
            botonPrevious.href = "index.html";
        };
    }
};

export {
    exponerPokemones,
}