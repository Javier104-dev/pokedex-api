import { obtenerNextPagina, obtenerDetallesPokemon } from "./services.js";
import { crearDiv } from "./listar-pokemones.js";

const botonNext = document.querySelector("[data-btn-next]");
const botonPrevious = document.querySelector("[data-btn-previous]");
const vaciarDiv = document.querySelector("[data-listado]");
const divContenedorHTML = document.querySelector("[data-listado]");

botonNext.addEventListener("click", ()=>{
    vaciarDiv.innerHTML = "";
    paginador(botonNext);
});

botonPrevious.addEventListener("click", ()=>{
    if(botonPrevious.id !== ""){
        vaciarDiv.innerHTML = "";
        paginador(botonPrevious);
    }
});

const paginador = (boton) =>{
    const idPagina = boton.id;
    obtenerNuevaLista(idPagina);
}

const obtenerNuevaLista = async (id)=>{
    const paginaJson = await obtenerNextPagina(id);
    const pokemones = paginaJson.results;
    pokemones.forEach(({name}) => {
        obtenerDetallesPokemon(name).then(({sprites})=>{
            const foto = sprites.front_default;
            const nuevoDiv = crearDiv(name, foto);
            divContenedorHTML.appendChild(nuevoDiv);
        });
    });

    if(paginaJson.previous === null){
        botonPrevious.id = "";
    }else{
        botonPrevious.id = paginaJson.previous;
    }
    botonNext.id = paginaJson.next;
};


