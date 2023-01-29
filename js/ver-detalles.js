import { obtenerDetallesPokemon} from "./services.js";
import { crearTarjetaDetalladas } from "./manejar-elementos-html-url.js";

const contenedorHtml = document.querySelector("[data-detalles]");
const listado = document.querySelector("[data-listado]");

const verPokemon = () =>{
    const id = obtenerId();
    if(id){
        ocultarBotones();
        detallarPokemones(id);
    }
};

const detallarPokemones = async (id) =>{
    try{
        const pokemonSeleccionado = await obtenerDetallesPokemon(id);
            let tipos = [];

            const nombre = pokemonSeleccionado.name;
            const foto = pokemonSeleccionado.sprites.front_default;
            const altura = pokemonSeleccionado.height;
            const peso = pokemonSeleccionado.weight
            const types = pokemonSeleccionado.types;
                types.forEach((tipo)=>{
                    tipos.push(tipo.type.name);
                });
                const tiposString = tipos.join(", ");
        
        const div = crearTarjetaDetalladas(nombre, foto, altura, peso, tiposString);
        listado.remove();
        contenedorHtml.appendChild(div);
    }catch(error) {alert("Ocurrio un error")};
};

const obtenerId = () =>{
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    return id;
}

function ocultarBotones(){
    const boton = document.querySelector(".paginador");
    const botonOculto = document.querySelector(".paginador__opcion__oculto");
    boton.style.display = "none"
    botonOculto.style.display = "block"
}

verPokemon();