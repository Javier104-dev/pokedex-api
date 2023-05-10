import { exponerPokemones } from "./exponer-pokemones.js";
import { crearUrlApi, ocultarBotones } from "./manipular-html-url.js";
import { obtenerId, detallarPokemones } from "./pokemon-seleccionado.js";


function inicializar (){
    exponerPokemones(crearUrlApi())

    if(obtenerId()){
        ocultarBotones();
        detallarPokemones(obtenerId());
    }
}

inicializar();