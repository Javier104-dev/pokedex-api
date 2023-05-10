import { obtenerCaracteristicasPokemon } from "./api.js";
import { obtenerPokemones} from "./manipular-api-storage.js";
import { mostrarPokemon,modificarUrlActual, obtenerUrlActual } from "./manipular-html-url.js";


const exponerPokemones = async (urlApi) =>{
    const divContenedorHTML = document.querySelector("[data-listado]");
    try{
        const { pokemones, anterior, siguiente } = await obtenerPokemones(urlApi);
        const listaPromesas = pokemones.map(pokemon => obtenerCaracteristicasPokemon(pokemon));
        const listaPromesasResueltas = await Promise.all(listaPromesas);
            listaPromesasResueltas.forEach(pokemon =>{
                mostrarPokemon(pokemon.name, pokemon.sprites.front_default, divContenedorHTML);
            })
        paginador(anterior, siguiente);
        
    }catch(error) {alert("Ocurrio un error")};
};

const paginador = (pagAnterior, pagSiguiente) =>{
    const botonNext = document.querySelector("[data-btn-next]");
    const botonPrevious = document.querySelector("[data-btn-previous]");

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