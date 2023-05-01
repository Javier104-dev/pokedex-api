import { exponerPokemones } from "./exponer-pokemones.js";
import { crearUrlApi, ocultarBotones } from "./manejar-elementos-html-url.js";
import { obtenerId, detallarPokemones } from "./caracteristicas-pokemon-seleccionado.js";

function inicializar (){
    exponerPokemones(crearUrlApi())

    if(obtenerId()){
        ocultarBotones();
        detallarPokemones(obtenerId());
    }
}

inicializar();