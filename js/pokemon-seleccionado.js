import { obtenerPokemon} from "./manipular-api-storage.js";
import { crearTarjetaDetalladas } from "./manipular-html-url.js";

const detallarPokemones = async (id) =>{
    const contenedorHtml = document.querySelector("[data-detalles]");
    const listado = document.querySelector("[data-listado]");

    try{
        const { foto, nombre, altura, peso, tipo, habilidades} = await obtenerPokemon(id);
        const div = crearTarjetaDetalladas(foto, nombre, altura, peso, tipo, habilidades);
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