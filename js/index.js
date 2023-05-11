import { exponerPokemones } from "./exponer-pokemones.js";
import { crearUrlApi, ocultarBotones } from "./manipular-html-url.js";
import { obtenerId, detallarPokemones } from "./pokemon-seleccionado.js";
import { obtenerPokemon, obtenerPokemones} from "./manipular-api-storage.js";


function inicializar (){
    exponerPokemones(obtenerPokemones(crearUrlApi()));

    if(obtenerId()){
        ocultarBotones();
        detallarPokemones(obtenerPokemon(obtenerId()));
    }
}

inicializar();