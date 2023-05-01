import { obtenerPokemon} from "./services.js";
import { crearTarjetaDetalladas } from "./manejar-elementos-html-url.js";

const contenedorHtml = document.querySelector("[data-detalles]");
const listado = document.querySelector("[data-listado]");



const detallarPokemones = async (id) =>{
    try{
        const pokemonSeleccionado = await obtenerPokemon(id);

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
        
        const div = crearTarjetaDetalladas(nombre, foto, altura, peso, tiposString, pokemonSeleccionado);
        listado.remove();
        contenedorHtml.appendChild(div);
    }catch(error) {alert("Ocurrio un error")};
};

const obtenerId = () =>{
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    return id;
}

export {
    obtenerId,
    detallarPokemones
}