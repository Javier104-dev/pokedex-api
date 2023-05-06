import { exponerPokemones } from "./exponer-pokemones.js";
import { crearUrlApi, ocultarBotones } from "./manejar-elementos-html-url.js";
import { obtenerId, detallarPokemones } from "./caracteristicas-pokemon-seleccionado.js";
import { obtenerDetallesPokemon } from "./services.js";


function inicializar (){
    exponerPokemones(crearUrlApi())

    if(obtenerId()){
        ocultarBotones();
        detallarPokemones(obtenerId());
    }
}

inicializar();


class Pokemon{
    constructor(nombre, altura, peso, tipo, habilidades){
        this.nombre = nombre;
        this.altura = altura;
        this.peso = peso;
        this.tipo = tipo;
        this.habilidades = habilidades;
    }
}


const jsonPokemon = await obtenerDetallesPokemon("charizard");

const mapearPokemon = (json) =>{
    const {
        name: nombre,
        height: altura,
        weight: peso,
        types: tipo,
        abilities: habilidades
    } = json;

    return new Pokemon(
        nombre,
        altura,
        peso,
        tipo.map( tipo => tipo.type.name),
        habilidades.map( habilidad => habilidad.ability.name)
    );
}

console.log(mapearPokemon(jsonPokemon))








