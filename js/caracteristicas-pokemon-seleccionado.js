import { obtenerPokemon} from "./services.js";
import { crearTarjetaDetalladas } from "./manejar-elementos-html-url.js";

const contenedorHtml = document.querySelector("[data-detalles]");
const listado = document.querySelector("[data-listado]");



const detallarPokemones = async (id) =>{
    try{
        const pokemonSeleccionado = await obtenerPokemon(id);
            let tipos = [];

            const {
                name: nombre,
                sprites: {front_default: foto}, //Para acceder a un objeto dentro de otro objeto usamos {} para poder desestructurar un objeto
                height: altura,
                weight: peso,
                types: tipoPoderes,
            } = pokemonSeleccionado;

            tipoPoderes.forEach((tipo)=>{
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