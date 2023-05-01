import { exponerPokemones } from "./listar-pokemones.js";
import { crearUrlApi, ocultarBotones } from "./manejar-elementos-html-url.js";
import { obtenerId, detallarPokemones } from "./tarjeta-detallada-pokemon.js";

function inicializar (){
    exponerPokemones(crearUrlApi())

    if(obtenerId()){
        ocultarBotones();
        detallarPokemones(obtenerId());
    }
}

inicializar()